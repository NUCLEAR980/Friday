export class AudioStreamer {
  private audioCtx: AudioContext;
  private nextStartTime: number = 0;
  private analyser: AnalyserNode;
  private gainNode: GainNode;

  constructor() {
    this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    this.analyser = this.audioCtx.createAnalyser();
    this.gainNode = this.audioCtx.createGain();
    this.analyser.fftSize = 256;
    this.analyser.connect(this.gainNode);
    this.gainNode.connect(this.audioCtx.destination);
  }

  addPCM16(base64Data: string) {
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    
    try {
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      for (let i = 0; i < int16Array.length; i++) {
        float32Array[i] = int16Array[i] / 32768.0;
      }

      const audioBuffer = this.audioCtx.createBuffer(1, float32Array.length, 24000);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = this.audioCtx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.analyser);

      const currentTime = this.audioCtx.currentTime;
      if (this.nextStartTime < currentTime) {
        this.nextStartTime = currentTime;
      }
      
      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;
    } catch (e) {
      console.error("Error adding PCM16 data:", e);
    }
  }

  getVolume(): number {
    if (!this.analyser) return 0;
    try {
      const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      this.analyser.getByteTimeDomainData(dataArray);
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        const val = (dataArray[i] - 128) / 128;
        sum += val * val;
      }
      return Math.sqrt(sum / dataArray.length);
    } catch (e) {
      return 0;
    }
  }

  setVolume(level: number) {
    if (this.gainNode) {
      this.gainNode.gain.setTargetAtTime(level, this.audioCtx.currentTime, 0.1);
    }
  }

  resume() {
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  stop() {
    this.nextStartTime = 0;
    if (this.audioCtx.state !== 'closed') {
      this.audioCtx.close().catch(e => console.error("Error closing audio context:", e));
    }
  }
}

export class AudioRecorder {
  private audioCtx: AudioContext | null = null;
  private stream: MediaStream | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

  async start(onData: (base64: string) => void, onVolume?: (vol: number) => void) {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true,
        } 
      });
      
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      this.source = this.audioCtx.createMediaStreamSource(this.stream);
      this.processor = this.audioCtx.createScriptProcessor(4096, 1, 1);

      this.processor.onaudioprocess = (e) => {
        const channelData = e.inputBuffer.getChannelData(0);
        let sum = 0;
        const int16Array = new Int16Array(channelData.length);
        for (let i = 0; i < channelData.length; i++) {
          sum += channelData[i] * channelData[i];
          int16Array[i] = Math.max(-1, Math.min(1, channelData[i])) * 32767;
        }
        
        if (onVolume) {
          onVolume(Math.sqrt(sum / channelData.length));
        }

        const bytes = new Uint8Array(int16Array.buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        onData(btoa(binary));
      };

      this.source.connect(this.processor);
      this.processor.connect(this.audioCtx.destination);
    } catch (err) {
      console.error("Failed to start audio recording:", err);
      throw err;
    }
  }

  stop() {
    if (this.processor && this.audioCtx) {
      this.processor.disconnect();
      this.source?.disconnect();
    }
    this.stream?.getTracks().forEach(t => t.stop());
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      this.audioCtx.close();
    }
    this.audioCtx = null;
    this.stream = null;
    this.processor = null;
    this.source = null;
  }
}

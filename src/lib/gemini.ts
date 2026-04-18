import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;
let currentKey: string | null = null;

export function getApiKey() {
  const userKey = typeof window !== 'undefined' ? localStorage.getItem('max_api_key') : null;
  const envKey = process.env.GEMINI_API_KEY || "";
  return userKey || envKey;
}

export function getAI() {
  const apiKey = getApiKey();
  
  if (!aiInstance || currentKey !== apiKey) {
    aiInstance = new GoogleGenAI({ apiKey });
    currentKey = apiKey;
  }
  return aiInstance;
}

export async function askGemini(prompt: string, systemInstruction?: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful assistant in the OmniTool productivity suite.",
      },
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini error:", error);
    const errorMessage = error.message || String(error);
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
      return "Error: API Quota Exceeded. Please check your billing details or add a valid API key in Settings.";
    }
    return "Error: Failed to get response from AI.";
  }
}

export async function extractTextFromImage(base64Image: string) {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { text: "Extract all text from this image accurately." },
          { inlineData: { data: base64Image, mimeType: "image/png" } },
        ],
      },
    });
    return response.text;
  } catch (error: any) {
    console.error("Gemini Vision error:", error);
    const errorMessage = error.message || String(error);
    if (errorMessage.includes('quota') || errorMessage.includes('429')) {
      return "Error: API Quota Exceeded. Please check your billing details or add a valid API key in Settings.";
    }
    return "Error: Failed to extract text.";
  }
}

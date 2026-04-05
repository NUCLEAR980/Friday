import { GoogleGenAI } from "@google/genai";

let aiInstance: GoogleGenAI | null = null;

function getAI() {
  if (!aiInstance) {
    const key = process.env.GEMINI_API_KEY || "";
    aiInstance = new GoogleGenAI({ apiKey: key });
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
  } catch (error) {
    console.error("Gemini error:", error);
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
  } catch (error) {
    console.error("Gemini Vision error:", error);
    return "Error: Failed to extract text.";
  }
}

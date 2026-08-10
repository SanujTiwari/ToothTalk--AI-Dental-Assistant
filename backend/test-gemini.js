import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
});

async function test() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [{ role: "user", parts: [{ text: "Hello" }] }],
      config: {
        systemInstruction: "You are a bot.",
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });
    console.log("Success:", response.text);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

test();

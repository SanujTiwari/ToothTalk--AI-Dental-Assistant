import { ai } from "@/lib/gemini";
import { DENTAL_SYSTEM_PROMPT } from "@/lib/dental-prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 }
      );
    }

    // Build conversation history for Gemini
    const contents = messages.map(
      (msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents,
      config: {
        systemInstruction: DENTAL_SYSTEM_PROMPT,
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    });

    const text =
      response.text ?? "I'm sorry, I couldn't process that. Please try again.";

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response. Please try again later." },
      { status: 500 }
    );
  }
}

import express from "express";
import { GoogleGenAI } from "@google/genai";
import { DENTAL_SYSTEM_PROMPT } from "../utils/dental-prompt.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST /api/chat
router.post("/", auth, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages are required." });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_GEMINI_API_KEY,
    });

    // Build conversation history for Gemini
    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    let text;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents,
        config: {
          systemInstruction: DENTAL_SYSTEM_PROMPT,
          temperature: 0.7,
          maxOutputTokens: 1024,
        },
      });
      text = response.text ?? "I'm sorry, I couldn't process that. Please try again.";
    } catch (apiError) {
      console.warn("Gemini API failed, generating fallback response:", apiError.message);
      
      if (apiError.message && (apiError.message.includes("429") || apiError.message.toLowerCase().includes("quota"))) {
        return res.json({ message: "I'm receiving too many requests right now. Please wait a few seconds and try asking again!" });
      }

      const lastUserMsg = messages[messages.length - 1]?.content || "";
      const query = lastUserMsg.toLowerCase();
      
      if (query.includes("pain") || query.includes("hurt") || query.includes("toothache") || query.includes("bleeding")) {
        text = "I understand you're dealing with dental discomfort or pain. If it's a severe toothache or bleeding, please rinse with warm salt water, apply a cold compress to the area, and avoid placing aspirin directly on the gums. I highly recommend scheduling a consultation with one of our dentists as soon as possible for a proper checkup.";
      } else if (query.includes("clean") || query.includes("brush") || query.includes("whiten") || query.includes("hygiene")) {
        text = "For good oral hygiene, brush twice a day for two minutes with fluoride toothpaste, floss daily, and visit the dentist every 6 months for a professional cleaning. Would you like me to guide you to our appointments page to book a cleaning?";
      } else if (query.includes("price") || query.includes("cost") || query.includes("fee") || query.includes("charge") || query.includes("payment")) {
        text = "Our clinic's standard prices are: ₹500 for a regular checkup, ₹400 for teeth cleaning, ₹300 for a general consultation, and ₹800 for emergency visits. You can schedule these directly from our 'Appointments' tab!";
      } else if (query.includes("appointment") || query.includes("book") || query.includes("slot") || query.includes("dentist")) {
        text = "You can book an appointment by clicking on the 'Appointments' tab in the navigation bar. Select your preferred dentist, date, and time, and confirm your slot instantly.";
      } else if (query.includes("hello") || query.includes("hi") || query.includes("hey")) {
        text = "Hello! I am Riley, your AI Dental Assistant. How can I help you with your oral health questions today?";
      } else {
        text = "Thank you for asking. As your AI Dental Assistant, I'm here to support you. For custom treatment suggestions or diagnosing specific issues, scheduling a direct checkup with our verified dentists via the Appointments tab is the best next step.";
      }
    }

    res.json({ message: text });
  } catch (error) {
    console.error("Critical Chat Route error:", error);
    res.status(500).json({ error: "Failed to get AI response. Please try again later." });
  }
});

export default router;

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize the Gemini API client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });

  // API Chat endpoint with secure proxy to Gemini
  app.post("/api/chat", async (req, res) => {
    try {
      const { history } = req.body;

      if (!history || !Array.isArray(history)) {
        return res.status(400).json({ error: "Invalid chat history provided." });
      }

      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY is not configured in environment secrets. Please set it via the Secrets panel." 
        });
      }

      // Convert history format to the shape expected by @google/genai
      const contents = history.map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.text }],
      }));

      const systemInstruction = `You are the official AI Assistant for 'Axom Xarothi', a trusted digital portal for the people of Assam (axomxarothi.in / axomxarothi.com).

Your primary goal is to help users by providing accurate, helpful, and concise information regarding:
1. Assam Government Schemes (e.g., Orunodoi 3.0, Nijut Moina, Swagat Sarothi, Pragyan Bharati Free Scooty, Mukhyamantri Mahila Udyamita Abhiyan).
2. Recruitment Updates (e.g., ADRE - Assam Direct Recruitment Exam Grade 3 and Grade 4, Assam Police SI/Constable, SSC GD, RRB, APDCL).
3. Assam Tourism (Kaziranga National Park, Majuli River Island, Jorhat Tea Estates, Kamakhya Temple, Sibasagar Historical Sites, Tezpur, Haflong).

STRICT RULES TO FOLLOW:
- Tone: Be polite, professional, friendly, and highly helpful.
- Language: If the user asks a question in Assamese, reply clearly and naturally in Assamese script. If they ask in English, reply in English. You can also understand and match Assamese written in Latin script (e.g. Romglish / phonetic Assamese like "Orunodoi scheme ki hoi?").
- Accuracy: Never invent or hallucinate fake job vacancies, exam dates, eligibility salary, or scheme criteria. If you do not know the exact deadline, eligibility criteria, or specific official release date, politely advise the user to verify by checking the official government notification / Assam Gazette or the official portal of Assam.
- Identity: Never say you are ChatGPT, OpenAI, or any other assistant. You are the 'Axom Xarothi AI Assistant' powered by Google Gemini.
- Support Exam Prep: Always prioritize helping candidates prepare for exams. Share helpful preparation topics, Assam General Knowledge, and guide them on core topics (with simple example questions if they ask to be quizzed).

State Schemes details for your reference:
- Orunodoi 3.0 Scheme: Financial assistance of Rs 1,250 to Rs 1,400 per month for eligible female members of low-income families. Key eligibility: Family income less than Rs 2 Lakhs per annum, female head of house, non-tax payers, no state/central government employee in family.
- Nijut Moina Scheme: Financial assistance/stipend for girls pursuing higher studies (Rs 1,000/month for HS, Rs 1,250/month for Degree, Rs 2,500/month for PG) to discourage early marriage and support female education.
- Pragyan Bharati: Free textbook scheme, free admission support in colleges, and scooty distribution to meritorious girls (at least 60% mark) and boys (at least 75% mark) in Higher Secondary (HS) examinations.
- Mukhyamantri Mahila Udyamita Abhiyan (MMUA): Assistance of up to Rs 35,000 in phases to rural women entrepreneurs under SHGs, subject to small family norms (maximum of 3 children for general, 4 for SC/ST).

ADRE (Assam Direct Recruitment Exam) structure:
- Two major categories: Class III (Grade 3) and Class IV (Grade 4) posts.
- Syllabus covers: General Knowledge (Assam History, Geography, Culture, Polity), Social Studies, School-level Mathematics, English, Reasoning/Mental Ability.

Provide structured responses using bullet points and clean Markdown formatting for readability. Try to keep answers concise and easy to read.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.6,
        },
      });

      const responseText = response.text || "I apologize, but I couldn't generate a response. Please try again.";
      res.json({ text: responseText });
    } catch (error: any) {
      console.error("Gemini API error in /api/chat:", error);
      res.status(500).json({ error: error.message || "An error occurred while communicating with the AI service." });
    }
  });

  // Serve static assets in production, otherwise Vite handles asset pipeline
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
}

startServer();

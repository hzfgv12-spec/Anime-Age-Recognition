import dotenv from "dotenv";
import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);
const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-2.5-flash";

app.use(express.json({ limit: "15mb" }));

app.post("/api/analyze", async (req, res) => {
  try {
    const { image, mimeType } = req.body as {
      image?: string;
      mimeType?: string;
      apiKey?: string;
    };

    if (!image || !mimeType) {
      return res.status(400).json({
        error: "Please provide image data and a valid MIME type.",
      });
    }

    const apiKey = req.body.apiKey?.trim() || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        error: "Missing API key. Enter one in the UI or set GEMINI_API_KEY in the server environment.",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "anime-age-recognition",
        },
      },
    });

    const cleanBase64 = image.replace(/^data:image\/\w+;base64,/, "");

    const promptText = [
      "You analyze anime-style character images and estimate visual age.",
      "Return only JSON that matches the schema.",
      "Base the answer on visible appearance, not official canon age.",
      "If the character might be non-human or ageless, explain that through the age estimate and age group.",
      "If the name is unknown, use 'Unknown Character'.",
      "visualEvidence must contain 2 to 4 short concrete observations.",
      "confidenceScore must be an integer from 0 to 100.",
      "customCardQuote must be an original line inspired by the character vibe.",
    ].join("\n");

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        {
          inlineData: {
            mimeType,
            data: cleanBase64,
          },
        },
        {
          text: promptText,
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            characterName: {
              type: Type.STRING,
              description: "Character name or 'Unknown Character'.",
            },
            estimatedAge: {
              type: Type.STRING,
              description: "Visual age estimate such as 16, 16-18, or looks about 14.",
            },
            estimatedAgeGroup: {
              type: Type.STRING,
              enum: ["child", "teen", "young_adult", "adult", "ageless"],
            },
            visualEvidence: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Concrete visual clues supporting the age estimate.",
            },
            features: {
              type: Type.OBJECT,
              properties: {
                hairColor: { type: Type.STRING },
                hairStyle: { type: Type.STRING },
                eyeStyle: { type: Type.STRING },
                clothing: { type: Type.STRING },
                accessory: { type: Type.STRING },
              },
              required: ["hairColor", "hairStyle", "eyeStyle", "clothing", "accessory"],
            },
            personalityVibe: {
              type: Type.OBJECT,
              properties: {
                primaryVibe: { type: Type.STRING },
                description: { type: Type.STRING },
              },
              required: ["primaryVibe", "description"],
            },
            confidenceScore: {
              type: Type.INTEGER,
            },
            animeArchetype: {
              type: Type.STRING,
              description: "Short archetype label such as mage, rival, swordsman, or idol.",
            },
            customCardQuote: {
              type: Type.STRING,
              description: "An original short quote matching the character vibe.",
            },
          },
          required: [
            "characterName",
            "estimatedAge",
            "estimatedAgeGroup",
            "visualEvidence",
            "features",
            "personalityVibe",
            "confidenceScore",
            "animeArchetype",
            "customCardQuote",
          ],
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("Gemini returned no parseable text.");
    }

    const data = JSON.parse(textOutput.trim());
    return res.json(data);
  } catch (error) {
    console.error("AI analysis failed:", error);
    const message = error instanceof Error ? error.message : "Unknown error.";
    return res.status(500).json({ error: message });
  }
});

async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Anime age recognition server listening on http://0.0.0.0:${PORT}`);
  });
}

setupServer();

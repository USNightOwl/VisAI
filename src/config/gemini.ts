import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory, SafetySetting } from "@google/generative-ai";

export interface GenerationConfig {
  temperature: number;
  topP: number;
  topK: number;
  maxOutputTokens: number;
  responseModalities: string[];
}

export interface ModelResponse {
  response: {
    candidates: {
      content: {
        parts: Array<{
          text?: string;
          inlineData?: any; // Adjust type if you know the exact type of inlineData
        }>;
      };
    }[];
  };
}

const safetySettings: SafetySetting[] = [
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_CIVIC_INTEGRITY, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
];

export async function runGeminiGeneratePrompt(prompt: string) {
  const apiKey = localStorage.getItem("apiKey")?.replace('"', "").replace('"', "") || "";

  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
  });

  const generationConfig = {
    temperature: 1.3,
    maxOutputTokens: 200,
    responseMimeType: "text/plain",
  };

  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export async function runGeminiGenerateImage(prompt: string) {
  const apiKey = localStorage.getItem("apiKey")?.replace('"', "").replace('"', "") || "";

  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: ["Text", "Image"],
  };

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig,
    safetySettings,
  });

  const response = await model.generateContent(prompt);
  for (const part of (response as ModelResponse).response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      return part.inlineData;
    }
  }
}

export async function runGeminiConvertImage(prompt: string, base64Image: string, base64Image2?: string) {
  const apiKey = localStorage.getItem("apiKey")?.replace('"', "").replace('"', "") || "";

  const genAI = new GoogleGenerativeAI(apiKey);

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseModalities: ["Text", "Image"],
  };

  const contents = [
    { text: prompt },
    {
      inlineData: {
        mimeType: "image/png",
        data: base64Image.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", ""),
      },
    },
  ];

  if (base64Image2) {
    contents.push({
      inlineData: {
        mimeType: "image/png",
        data: base64Image2.replace("data:image/png;base64,", "").replace("data:image/jpeg;base64,", ""),
      },
    });
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash-exp",
    generationConfig,
    safetySettings,
  });

  const response = await model.generateContent(contents);
  for (const part of (response as ModelResponse).response.candidates[0].content.parts) {
    // Based on the part type, either show the text or save the image
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      return part.inlineData;
    }
  }
}

export const promptData = {
  "generate-content": {
    contents: [
      {
        parts: [
          {
            text: "Generate a creative, detailed, and interesting prompt for an AI image generator. The prompt should be descriptive, realistic, and suitable for generating a visually appealing image. The goto topics are beautiful girl, handsome boy, or a cute animal. Avoid including kids or any sensitive topics. Only return the prompt text without any additional explanation or preamble.",
          },
        ],
      },
    ],
    generationConfig: { temperature: 1.3, maxOutputTokens: 200 },
  },
  "generate-image": {
    contents: [
      {
        parts: [{ text: "{prompt}" }],
      },
    ],
    generationConfig: { responseModalities: ["TEXT", "IMAGE"] },
    safetySettings: [
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    ],
  },
};

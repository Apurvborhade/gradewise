import { getGeminiModel } from "../config/gemini";

export const generateFeedback = async (studentAnswer) => {
    try {
        const prompt = `
      Provide detailed feedback for the student's response.
      Highlight strengths, areas for improvement, and suggestions.
      
      Student Answer:
      ${studentAnswer}
    `;

        const model = getGeminiModel();
        const response = await model.generateContent(prompt);
        return response.text();
    } catch (error) {
        console.error("Error in feedback generation:", error);
        throw new Error("Feedback generation failed");
    }
};

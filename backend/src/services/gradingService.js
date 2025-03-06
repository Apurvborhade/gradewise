import { getGeminiModel } from "../config/gemini.js";

export const gradeAssignment = async (
    studentAnswer,
    maxScore,
    gradingCriteria
) => {
    try {
        const prompt = `
      You are an AI grader. Evaluate the student's response based on:
      - ${gradingCriteria}
      - Assign a score out of ${maxScore}.
      - Provide constructive feedback.
      - in response mention Score at start of response like => Score:
    
      There's no question you just have to score on the basis of given input ,
      if you find any Question and answer format in the provided text itself then evaluate on the basis of that or else just evaluate with question  
      Student Answer:
      ${studentAnswer}
    `;

        const model = getGeminiModel();

        const result = await model.generateContent(prompt);
        const aiResponse = result.response.text();

        // Extract AI-generated score
        const scoreMatch = aiResponse.match(/Score:\s*(\d+)/);
        const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;

        return { score, feedback: aiResponse };
    } catch (error) {
        console.error("Error in grading:", error);
        throw new Error("Grading failed");
    }
};

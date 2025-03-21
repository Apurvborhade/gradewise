import { getGeminiModel } from "../config/gemini.js";

const generatePrompt = (assignmentType, studentAnswer, gradingCriteria, maxScore) => {
    let typeSpecificPrompt = "";

    switch (assignmentType) {
        case "coding":
            typeSpecificPrompt = `
### Evaluation Criteria:
1. **Correctness** - Does the code produce the expected output?
2. **Efficiency** - Is the solution optimized?
3. **Readability** - Does it follow best practices?
4. **Edge Cases** - Does it handle different inputs correctly?

### **Student's Code Submission:**
\`\`\`js
${studentAnswer}
\`\`\`

### **Response Format (STRICT)**:
Return your response in the exact format below:
\`\`\`
Score: X/${maxScore}
Feedback:
- Correctness: [Detailed feedback]
- Efficiency: [Detailed feedback]
- Readability: [Detailed feedback]
- Edge Cases: [Detailed feedback]
\`\`\`
`;
            break;

        case "subjective":
            typeSpecificPrompt = `
### Evaluation Criteria:
1. **Depth of Explanation** - Is the answer well-supported?
2. **Clarity & Grammar** - Is it well-structured and free of major errors?
3. **Relevance** - Does it fully address the topic?

### **Student's Answer:**
"${studentAnswer}"

### **Response Format (STRICT)**:
\`\`\`
Score: X/${maxScore}
Feedback:
- Depth of Explanation: [Detailed feedback]
- Clarity & Grammar: [Detailed feedback]
- Relevance: [Detailed feedback]
\`\`\`
`;
            break;

        case "objective":
            typeSpecificPrompt = `
### Evaluation Criteria:
1. **Accuracy** - Are the answers correct?
2. **Completeness** - Did the student answer all required questions?

### **Student's Responses:**
"${studentAnswer}"

### **Response Format (STRICT)**:
\`\`\`
Score: X/${maxScore}
Correct Answers: [If applicable, provide correct answers]
Feedback:
- Accuracy: [Detailed feedback]
- Completeness: [Detailed feedback]
\`\`\`
`;
            break;

        default:
            typeSpecificPrompt = "Invalid assignment type.";
    }

    return `
You are an AI grader. Evaluate the student's response carefully and provide a structured evaluation.

### **Assignment Type:** ${assignmentType}  
### **Grading Criteria:** ${gradingCriteria}  

${typeSpecificPrompt}

⚠️ **IMPORTANT:** Do NOT include additional explanations outside the structured format.
`;
};
export const gradeAssignment = async (
    assignmentType,
    studentAnswer,
    maxScore,
    gradingCriteria
) => {
    try {
        const prompt = generatePrompt(assignmentType, studentAnswer, gradingCriteria, maxScore)

        const model = getGeminiModel();

        const result = await model.generateContent(prompt);
        const aiResponse = result.response.text();

        // Extract AI-generated score
        const scoreMatch = aiResponse.match(/Score:\s*(\d+)[\/]?\d*/i);
        const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 0;
        if (score === null) {
            console.warn("AI didn't provide a score. Setting to 0.");
            score = 0;
        }
        return { score, feedback: aiResponse };
    } catch (error) {
        console.error("Error in grading:", error);
        throw new Error("Grading failed");
    }
};

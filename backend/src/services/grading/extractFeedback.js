export const extractFeedback = (feedbackString) => {
    const strengthsMatch = feedbackString.match(/strengths:\s*\[\s*(.*?)\s*\]/s);
    const improvementsMatch = feedbackString.match(/improvements:\s*\[\s*(.*?)\s*\]/s);
    const overallFeedbackMatch = feedbackString.match(/overallFeedback:\s*"([^"]*)"/s);

    const parseArray = (match) => {
        if (!match || !match[1]) return [];
        return match[1]
            .split(/',\s*'/) // Split at "', '"
            .map((item) => item.replace(/^["']|["']$/g, "").trim()) // Remove quotes and trim spaces
            .filter(Boolean);
    };

    return {
        strengths: parseArray(strengthsMatch),
        improvements: parseArray(improvementsMatch),
        overallFeedback: overallFeedbackMatch ? overallFeedbackMatch[1].trim() : "No overall feedback available.",
    };
};



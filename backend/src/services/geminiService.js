import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("geminiService: ",process.env.GEMINI_API_KEY);

const getModel = () => {
    console.log("Service key:", process.env.GEMINI_API_KEY);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    return genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });
};

export const analyzeResume = async (resumeText) => {

    let cleanedResponse = "";

    try{
    const prompt = `
    You are a senior backend technical interviewer.

    Analyze the following resume.

    Resume:
        ${resumeText}

    Tasks:

       1. Extract:
        - Skills
        - Projects
        - Experience
        - Education

    2. Generate exactly 10 backend interview questions based ONLY on the resume.

    Rules:
        - Questions should be technical.
        - Cover skills, projects and experience.
        - Return ONLY valid JSON.
        - Do not use markdown.
        - Do not wrap the response inside triple backticks.

    Expected JSON:

        {
            "extractedData": {
            "skills": [],
            "projects": [],
            "experience": [],
            "education": []
        },

        "questions": [
        {
            "question": "",
            "topic": "",
            "difficulty": "Easy | Medium | Hard"
        }
    ]
}
`;

    const model = getModel();
    const result = await model.generateContent(prompt);

    const response =  result.response.text();

    cleanedResponse = response
        .replace(/^\s*```json\s*/, "")
        .replace(/\s*```\s*$/, "")
        .trim();

        return JSON.parse(cleanedResponse);

    } catch (error) {
        console.error("Error analyzing resume:",cleanedResponse, error);
        throw new Error("Invalid JSON returned by Gemini");
    }
};

export const evaluateInterview = async (questions, answers) => {

    let cleanedResponse = "";

    try {

        const prompt = `
You are a senior software engineering interviewer.

The candidate has completed a mock technical interview.

Interview Questions:
${JSON.stringify(questions, null, 2)}

Candidate Answers:
${JSON.stringify(answers, null, 2)}

Evaluate the candidate carefully.

Consider:

- Technical knowledge
- Correctness
- Communication
- Confidence
- Problem solving
- Practical understanding
- Completeness of answers

Return ONLY valid JSON.

Do NOT use markdown.
Do NOT wrap the response inside triple backticks.

Expected JSON format:

{
  "score": 0,
  "summary": "",
  "strengths": [
    "",
    "",
    "",
    ""
  ],
  "weaknesses": [
    "",
    "",
    "",
    ""
  ],
  "feedback": ""
}

Rules:

- score must be between 0 and 100.
- summary should be 2-3 concise sentences.
- strengths must contain exactly 4 short bullet points.
- weaknesses must contain exactly 4 short bullet points.
- feedback should be a detailed paragraph (150-250 words) explaining the overall performance, what the candidate did well, where improvement is needed, and how they can improve.
- Return ONLY JSON.
`;

        const model = getModel();

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        cleanedResponse = response
            .replace(/^\s*```json\s*/, "")
            .replace(/\s*```\s*$/, "")
            .trim();

        return JSON.parse(cleanedResponse);

    } catch (error) {

        console.error("Error evaluating interview:", error);

        if (cleanedResponse) {
            console.error("Cleaned Response:", cleanedResponse);
        }

        throw new Error("Invalid JSON returned by Gemini");
    }
};
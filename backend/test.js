import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.GEMINI_API_KEY);

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const result = await model.generateContent("Say only Hello");

console.log(result.response.text());
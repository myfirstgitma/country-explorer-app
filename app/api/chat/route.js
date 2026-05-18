import { GoogleGenerativeAI } from "@google/generative-ai";
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(req) {
  try {
    const { message } = await req.json();
    const model = genAi.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    const result = await model.generateContent(message);
    const response = result.response.text();
    return Response.json({
      reply: response,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error: "Something went wrong",
    });
  }
}

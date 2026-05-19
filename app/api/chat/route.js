import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
console.log("KEY:", process.env.GROQ_API_KEY);
export async function POST(req) {
  try {
    const { message } = await req.json();

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // free and very capable
      messages: [{ role: "user", content: message }],
    });

    const reply = completion.choices[0].message.content;
    return Response.json({ reply });
  } catch (error) {
    console.log(error);
    const status = error?.status === 429 ? 429 : 500;
    const message =
      error?.status === 429
        ? "Too many requests — please wait and try again."
        : "Something went wrong";
    return Response.json({ error: message }, { status });
  }
}

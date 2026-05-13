import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    
    console.log("API KEY:", process.env.OPENAI_API_KEY);


    const body = await req.json();
    const prompt = body.prompt;

    const response = await client.responses.create({
      model: "gpt-4.1",
      input: `Generate a cinematic video scene: ${prompt}`,
    });

    return Response.json({
      result: response.output_text,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      error: "Something went wrong",
    }, { status: 500 });
  }
}
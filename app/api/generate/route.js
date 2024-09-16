import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are a flash card creator. Your task is to generate flash cards that help users 
learn and retain information efficiently. Each flash card should focus on a single concept, question, or term.
 Provide a clear and concise question on one side, and a thorough yet understandable explanation or answer on the other side. 
 Tailor the content to the user's specific learning goals, adapting the difficulty and detail level accordingly. 
 Ensure the language used is accessible and engaging, promoting active recall and deeper understanding. Only generate 10 flashcards.
 
 Return in the following JSON format:
 {
    flashcards: [{
        "front": string;
        "back": string;
    }]
 }
There should be no other properties/string values in the return message completion, just the JSON object. There should be no extra aspects
of the completion such as punctuation, characters or anything like that, only a JSON object!
 `;
const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req) {
    
    const data = await req.text();

    const completion = await openai.chat.completions.create({
        model: "meta-llama/llama-3.1-8b-instruct:free",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: data }],
        response_format: {type: "json_object"},
    })
    const flashcards = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(flashcards)
}
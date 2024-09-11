import { PR } from "@/types/PR";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePRData(): Promise<PR[]> {
  const prompt = `Generate an array of 5 pull request objects for a fictional software project. Each object should have the following properties:
  - title: A brief, descriptive title for the PR
  - description: A short description of the changes
  - code: A small code snippet (20-30 lines) related to the PR
  - user: An object with 'name' and 'avatar' properties
  - labels: An array of 1-3 relevant labels
  - commits: A number between 1 and 5
  - comments: A number between 0 and 10
  - isCorrect: A boolean indicating if the PR should be merged (70% true, 30% false)

  Make sure to include a mix of serious and humorous PRs, with varying levels of complexity and correctness.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  const generatedData = JSON.parse(response.choices[0].message.content || "[]");
  return generatedData;
}

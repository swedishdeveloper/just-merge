"use server";
import { PR } from "@/types/PR";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { z } from "zod";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PRData = z.object({
  prList: z.array(
    z.object({
      title: z.string(),
      description: z.string().describe("Short description of the PR."),
      filename: z.string(),
      oldCode: z
        .string()
        .describe(
          "Old code if there is any, else empty string. Only formatted code.."
        ),
      newCode: z.string().describe("New code. Only formatted code."),
      startingLineNumber: z.number(),
      user: z.object({
        name: z.string().describe("Name of the user."),
        avatar: z
          .string()
          .describe("URL to the user's avatar, i.pravatar.cc url."),
      }),
      labels: z.array(z.string()),
      commits: z.number(),
      comments: z.number(),
      isCorrect: z.boolean(),
    })
  ),
});

export async function generatePRData(): Promise<PR[]> {
  const prompt =
    "Generate 10 funny pull requests. Create PRs with and without old code.";

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are an assistant that writes funny PRs, some of them if incorrect code that wont work, some of them is correct code.
            The code could be either funny or serious.`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.5,
      response_format: zodResponseFormat(PRData, "pr_data"),
    });

    const generatedData = JSON.parse(response.choices[0].message.content ?? "");
    console.log(generatedData);
    return generatedData.prList;
  } catch (error) {
    console.error("Error generating PR data:", error);
    throw error;
  }
}

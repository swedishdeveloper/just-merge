"use server";
import { PR } from "@/types/PR";
import { serverHooks } from "next/dist/server/app-render/entry-base";
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
      description: z.string(),
      code: z.string(),
      user: z.object({
        name: z.string(),
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
  const prompt = "Generate 3 funny pull requests.";

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are an assistant that writes funny PRs, some of them if faulty code, some of them is correct code. Short codes only.",
      },
      { role: "user", content: prompt },
    ],
    response_format: zodResponseFormat(PRData, "pr_data"),
  });

  const generatedData = JSON.parse(response.choices[0].message.content);
  return generatedData.prList;
}

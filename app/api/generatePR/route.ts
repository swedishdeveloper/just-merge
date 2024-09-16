// /app/api/generatePR/route.ts
import { NextResponse } from "next/server";
import { generatePRData } from "@/lib/gpt";

// Rate limiting state stored in memory
let requestCountsPerMinute: { [key: string]: number } = {};
let requestCountsPerDay: { [key: string]: number } = {};

// Reset the request counters every minute and day
const resetMinuteCounters = () => {
  requestCountsPerMinute = {};
  setTimeout(resetMinuteCounters, 60000); // Reset every minute
};

const resetDailyCounters = () => {
  requestCountsPerDay = {};
  const now = new Date();
  const msUntilMidnight =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() -
    now.getTime();
  setTimeout(resetDailyCounters, msUntilMidnight); // Reset every day at midnight
};

resetMinuteCounters();
resetDailyCounters();

export async function GET(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("host");

  // Initialize counts for this IP if not present
  if (!requestCountsPerMinute[ip!]) requestCountsPerMinute[ip!] = 0;
  if (!requestCountsPerDay[ip!]) requestCountsPerDay[ip!] = 0;

  // Check rate limits
  if (requestCountsPerMinute[ip!] >= 10) {
    return NextResponse.json(
      { message: "Too many requests. Try again in a minute." },
      { status: 429 }
    );
  }

  if (requestCountsPerDay[ip!] >= 50) {
    return NextResponse.json(
      {
        message: "Daily limit reached. You can only make 50 requests per day.",
      },
      { status: 429 }
    );
  }

  // Increment counts
  requestCountsPerMinute[ip!] += 1;
  requestCountsPerDay[ip!] += 1;

  // Call the OpenAI API
  try {
    const prData = await generatePRData();
    return NextResponse.json({ prData }, { status: 200 });
  } catch (error) {
    console.error("Error generating PR data:", error);
    return NextResponse.json(
      { message: "Failed to generate PR data." },
      { status: 500 }
    );
  }
}

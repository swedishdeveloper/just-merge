import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { generatePRData } from "@/lib/gpt";
import type { PR } from "@/types/PR";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const database = client.db("just-merge");
    const collection = database.collection("PRs");
    const iterations = 30;
    const prData = await Promise.all(
      Array.from({ length: iterations }, () => generatePRData())
    ).then((results) => results.flat());
    await collection.insertMany(prData);
    return NextResponse.json(
      { message: "PRs added successfully", prData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add PRs", error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "0");

    const client = await clientPromise;
    const database = client.db("just-merge");
    const collection = database.collection("PRs");
    const PRs = await collection
      .aggregate([{ $sample: { size: limit } }])
      .toArray();
    return NextResponse.json({ PRs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to connect to the database",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

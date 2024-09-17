import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Import the clientPromise
import { generatePRData } from "@/lib/gpt";

export async function POST(req: Request) {
  try {
    const client = await clientPromise; // Reuse the existing connection
    const database = client.db("just-merge");
    const collection = database.collection("PRs");
    const prData = await generatePRData();
    const result = await collection.insertMany(prData);
    return NextResponse.json(
      { message: "PRs added successfully", prData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add user", error: error.message },
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
      { message: "Failed to connect to the database", error: error.message },
      { status: 500 }
    );
  }
}

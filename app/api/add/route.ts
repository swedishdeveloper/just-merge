import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Import the clientPromise

export async function POST(req: Request) {
  try {
    const client = await clientPromise; // Reuse the existing connection
    const database = client.db("just-merge");
    const collection = database.collection("PRs");
    const pr = await collection.insertOne({
      title: "Test PR",
      description: "This is a test PR",
      filename: "test.js",
      oldCode: "",
      newCode: "console.log('Hello, World!');",
      startingLineNumber: 1,
      user: {
        name: "Test User",
        avatar: "https://i.pravatar.cc/150?u=test-user",
      },
      labels: ["test"],
      commits: 1,
      comments: 0,
      isCorrect: true,
    });
    return NextResponse.json(
      { message: "User added successfully", user },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add user", error: error.message },
      { status: 500 }
    );
  }
}

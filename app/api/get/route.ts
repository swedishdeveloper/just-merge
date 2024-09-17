import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb"; // Import the clientPromise

export async function GET(req: Request) {
  try {
    const client = await clientPromise; // Reuse the existing connection
    const database = client.db("just-merge");
    return NextResponse.json(
      { message: "Connected to the database successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to connect to the database", error: error.message },
      { status: 500 }
    );
  }
}

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

/* eslint-disable no-var */
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}
/* eslint-enable no-var */

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, reuse the MongoClient instance across hot reloads
  if (!globalThis._mongoClientPromise) {
    client = new MongoClient(uri); // No options needed
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  // In production, always create a new MongoClient
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;

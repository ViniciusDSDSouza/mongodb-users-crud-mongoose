import { MongoClient, ServerApiVersion, Db } from "mongodb";

export let mongoDatabase: Db;

export async function connectToDatabase() {
  const DATABASE_URI = process.env.DATABASE_URI || "";
  const DATABASE_NAME = process.env.DATABASE_NAME || "";

  const client = new MongoClient(DATABASE_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
    mongoDatabase = await client.db(DATABASE_NAME);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

connectToDatabase();

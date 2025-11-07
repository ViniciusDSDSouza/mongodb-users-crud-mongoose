import { connect } from "mongoose";

export async function connectToDatabase() {
  const DATABASE_URI = process.env.DATABASE_URI || "";
  const DATABASE_NAME = process.env.DATABASE_NAME || "mongodb";

  try {
    const connection = await connect(DATABASE_URI, {
      dbName: DATABASE_NAME,
    });
    console.log("Connected to MongoDB");
    return connection;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

connectToDatabase();

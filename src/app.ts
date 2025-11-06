import "dotenv/config";
import express from "express";
import { Request, Response } from "express";

export const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

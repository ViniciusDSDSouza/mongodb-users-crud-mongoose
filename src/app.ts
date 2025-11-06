import "dotenv/config";
import express from "express";
import { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";

export const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.get("/", async (_req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World" });
});

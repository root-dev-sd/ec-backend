import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Express app with TypeScript!");
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

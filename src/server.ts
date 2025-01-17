import express, { Request, Response } from "express";
import helmet from "helmet";
import prisma from "../db";
import {
  isValidFullName,
  ValidationResult,
  ValidationError,
  isValidationError,
  generateVerificationCode,
  isValidPhoneNumber,
} from "./utils/validation";

const app = express();
app.use(express.json());
app.use(helmet());
app.disable("x-powered-by");

app.post("/signup", (req: Request, res: Response) => {
  res.send("sign up route");
});

app.post("/login", (req: Request, res: Response) => {
  res.send("log in route");
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

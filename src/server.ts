import express, { Request, Response } from "express";
import helmet from "helmet";
import { genSalt, hash } from "bcrypt-ts";
import prisma from "./db";
import { Validator } from "jsonschema";
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

const v = new Validator();

const signUpSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    phoneNumber: { type: "string" },
    password: { type: "strig" },
  },
  required: ["name", "email", "phoneNumber", "password"],
  additionalProperties: false,
};

app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const data = req.body;
  if (!v.validate(data, signUpSchema).valid) {
    res.status(400).json({ message: "invalid request body" });
  }
  const { name, email, phoneNumber, password } = data;
  const nameResult = isValidFullName(name);
  if (!nameResult.isValid) {
    res.status(400).json(nameResult.error);
  }
  if (!isValidPhoneNumber(phoneNumber)) {
    res.status(400).json({ message: "phone number not compatible" });
  }
  const exist = await prisma.user.findMany({
    where: {
      OR: [{ email }, { phoneNumber }],
    },
  });
  if (exist) {
    res.status(409).json({ message: "user already exists" });
  }
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      phoneNumber,
      password: hashed,
    },
  });
  res.status(201).json({ message: "user created successfully" });
});

app.post("/api/v1/login", (req: Request, res: Response) => {
  res.send("log in route");
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

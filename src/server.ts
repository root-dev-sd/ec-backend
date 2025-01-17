import express, { Request, Response } from "express";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { genSalt, hash, compare } from "bcrypt-ts";
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

dotenv.config();
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

const phoneLogIn = {
  type: "object",
  properties: {
    phoneNumber: { type: "string" },
    password: { type: "string" },
  },
  required: ["phoneNumber", "password"],
  additionalProperties: false,
};

const emailLogIn = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<Response | any> => {
    const data = req.body;
    if (!v.validate(data, signUpSchema).valid) {
      return res.status(400).json({ message: "invalid request body" });
    }
    const { name, email, phoneNumber, password } = data;
    const nameResult = isValidFullName(name);
    if (!nameResult.isValid) {
      return res.status(400).json(nameResult.error);
    }
    if (!isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({ message: "phone number not compatible" });
    }
    const emailExist = await prisma.user.findUnique({
      where: { email },
    });
    const phoneExist = await prisma.user.findUnique({
      where: { email },
    });
    if (emailExist) {
      return res.status(409).json({ message: "user already exists" });
    } else if (phoneExist) {
      return res.status(409).json({ message: "user already exists" });
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
    return res.status(201).json({ message: "user created successfully" });
  }
);

app.post(
  "/api/v1/login/phone",
  async (req: Request, res: Response): Promise<Response | any> => {
    const data = req.body;
    if (!v.validate(data, phoneLogIn).valid) {
      return res.status(400).json({ message: "invalid request body" });
    }
    if (!isValidPhoneNumber) {
      return res.status(400).json({ message: "invalid phone number" });
    }
    const { phoneNumber, password } = data;
    const user = await prisma.user.findFirst({
      where: { phoneNumber },
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "wrong phone number or password" });
    }
    if (await compare(password, user.password)) {
      const payload = {
        name: user.name,
        id: user.id,
        password: user.password,
      };
      const secret = process.env.TOKEN_KEY;
      const token = jwt.sign(
        payload,
        "hjs82KSD9!@sldj*&sDla%0Ksjeh4@3*DFJKL3kjd83s",
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(200)
        .json({ message: "log in successfuly", token, user });
    } else {
      return res
        .status(401)
        .json({ message: "wrong phone number or password" });
    }
  }
);

app.post(
  "/api/v1/login/email",
  async (req: Request, res: Response): Promise<Response | any> => {
    const data = req.body;
    if (!v.validate(data, emailLogIn).valid) {
      return res.status(400).json({ message: "invalid request body" });
    }
  }
);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

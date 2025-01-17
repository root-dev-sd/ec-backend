import express, { Request, Response } from "express";
import twilio from "twilio";
import dotenv from "dotenv";
import { Validator } from "jsonschema";
// import {
//   isValidFullName,
//   ValidationResult,
//   ValidationError,
//   isValidationError,
//   generateVerificationCode,
//   isValidPhoneNumber,
// } from "./controllers/phoneControls";

dotenv.config();

const v = new Validator();

const phoneLogIn = {
  type: "object",
  properties: {
    name: { type: "string" },
    phoneNumber: { type: "string" },
    password: { type: "string" },
  },
  required: ["name", "phoneNumber", "password"],
  additionalProperties: false,
};

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const router = express.Router();

router.post("/request", (req: Request, res: Response) => {
  const data = req.body;
  if (v.validate(data, phoneLogIn).valid) {
    const { name, phoneNumber, password } = data;
    // if (!isValidPhoneNumber(phoneNumber)) {
    //   res.status(400).json({ message: "phone number is not valid" });
    // }
    // const result = isValidFullName(name);
    // if (!result.isValid) {
    //   res.status(400).json(result.error);
    // }
  } else {
    res.status(400).json({ message: "Request body incorrect" });
  }
});

export default router;

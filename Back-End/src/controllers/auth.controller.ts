import { Request, Response } from "express";
import { IUser, UserRole, Address } from "../interfaces/User";
import Schema from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import hash from "../utils/hashPassword";
import * as dotenv from "dotenv";
import validate from "../validation/user.validation";

dotenv.config();

const registervalidation = (body: unknown) => {
  return validate.userRegisterValidator.safeParse(body);
};

const RegisterAsUser = async (req: Request, res: Response): Promise<void> => {
  const parsedData = registervalidation(req.body);
  if (!parsedData.success) {
    res.status(400).json({
      message: "validation failed",
      errors: parsedData.error.errors,
    });
  }

  const { street, city, state, zip }: Address = req.body.address;

  const { name, email, password, address, phone }: IUser = req.body;

  try {
    const addressOfUser = await Schema.address.create({
      street,
      city,
      state,
      zip,
    });
    const hashedPassword = await bcrypt.hash(password, 10);

    const userCreated = await Schema.User.create({
      name,
      email,
      password: hashedPassword,
      address: addressOfUser._id,
      role: UserRole.User,
      phone,
    });

    if (!process.env.JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }

    const token = jwt.sign(
      { userId: userCreated._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRE_TIME }
    );

    res.status(201).json({ Token: token });
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const Loginvalidation = (body: unknown) => {
  return validate.userLoginValidator.safeParse(body);
};

const LoginAsUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = Loginvalidation(req.body);
    if (!parsedData.success) {
      res.status(400).json({
        message: "validaiton failed",
        errors: parsedData.error.errors,
      });
    }

    const { email, password } = req.body;

    const user = await Schema.User.findOne({ email });

    if (!user) {
      res.status(500).json({ Error: "Email is not dound" });
      return;
    }

    const authorized = await hash.isMatch(password, user!.password);

    if (!authorized) {
      res.status(404).json({ Error: "wrong password" });
      return;
    }

    if (!process.env.JWT_SECRET_KEY)
      throw new Error("JWT_SECRET_KEY is not defined");

    const token = jwt.sign({ userId: user!._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });

    res.status(200).json(token);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

export default {
  RegisterAsUser,
  LoginAsUser,
};

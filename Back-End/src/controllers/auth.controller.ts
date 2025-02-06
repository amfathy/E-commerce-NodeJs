import { Request, Response } from "express";
import authService from "../services/auth.service";

const RegisterAsUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const Registering = await authService.UserRegistration(req.body);
    if (!Registering.success) res.status(400).json(Registering);

    res.status(201).json(Registering);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const LoginAsUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const loging = await authService.login(req.body);
    if (!loging) res.status(400).json(loging);

    res.status(200).json(loging);
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

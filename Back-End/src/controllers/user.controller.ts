import { Request, Response } from "express";
import UserService from "../services/user.service";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getUsers();
    if (!users.success) res.status(401).json({ message: users.message });

    res.status(200).json(users.data);
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

export default {
  getUsers,
};

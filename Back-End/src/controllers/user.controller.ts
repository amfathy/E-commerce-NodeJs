import { Request, Response } from "express";
import UserService from "../services/user.service";
import { userInfo } from "os";

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserService.getUsers();
    if (!users.success) {
      res.status(401).json({ message: users.message });
      return;
    }
    res.status(200).json({Message : users.message , Data : users.data});
    return;
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};

const GetUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    if (!id) res.status(401).json({ message: "id not exist" });
    const userInfo = await UserService.GetUserById(id);
    if (!userInfo.success) {res.status(404).json(userInfo.message); return;}
    res.status(200).json({ message: userInfo.message, data: userInfo.data });
    return;
  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" } );
  }
};

export default {
  getUsers,GetUserById
};

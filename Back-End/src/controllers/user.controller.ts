import { Request, Response } from "express";
import UserModel from "../models/user.model";  


const getUsers = async (req: Request, res: Response): Promise <void> => {
    try{
        const users = await UserModel.User.find().populate('address');
        res.status(200).json(users);
    }
    catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}


export default {
    getUsers
}



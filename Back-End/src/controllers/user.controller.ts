import { Request, Response } from "express";
import UserModel from "../models/user.model";  
import { IUser } from "../interfaces/User";
import bcrypt from 'bcryptjs';

const createUser = async (req: Request, res: Response): Promise <void> => {

    const isExsiting = await UserModel.User.findOne({email: req.body.email}); 
    if(isExsiting)  res.status(400).json({message: "User already exists"});   

    try{
        const {street, city, state, zip} = req.body.address;
        const newAddress = await UserModel.Address.create({street, city, state, zip});
        await newAddress.save();

        const adressId = newAddress._id;
        const {name, email, password, role, address, phone}:IUser = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await UserModel.User.create({
            name,
            email,
            password: hashedPassword,
            role, 
            address : adressId, 
            phone
        });

        res.status(201).json({message: "User created successfully"});

    }
    catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

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
    createUser,
    getUsers
}



import { Request, Response } from "express";
import { IUser, UserRole, Address } from "../interfaces/User";
import Schema from "../models/user.model";
import bcrypt from 'bcryptjs'

const RegisterAsUser = async (req: Request, res: Response) => {
  const { street, city, state, zip }: Address = req.body.address;
  
  if (!street || !city || !state || !zip ) 
    return res.status(400).json({ error: "All fields are required." });
  
  const { name, email, password, address, phone }: IUser = req.body;
  if (!email || !name || !password || !address || !phone) 
    return res.status(400).json({ error: "All fields are required." });
  

  try {
    const addressOfUser = await Schema.address.create({
      street,
      city,
      state,
      zip,
    });
    const hashedPassword = await bcrypt.hash(password , 10); 

    await Schema.User.create({
      name,
      email,
      password : hashedPassword,
      address: addressOfUser._id,
      phone,
    });

    res.status(201).json("User Created");

  } catch (err) {
    err instanceof Error
      ? res.status(500).json({ message: err.message })
      : res.status(500).json({ message: "An unknown error occurred" });
  }
};




export default{
    RegisterAsUser , 
    //LoginAsUser ,
}
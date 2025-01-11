import ISubcategory from "../interfaces/Subcategory";
import Subcategory from "../models/subcategory.model";
import { Request, Response } from 'express';

const createSubcategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const isExsitinge = await Subcategory.findOne({ name: req.body.name });
        if (isExsitinge) {
            res.status(400).json({ message: "Subcategory already exists or change name" });
            return ;
        } 
        const {name , category_id }: ISubcategory = req.body;
        await Subcategory.create({
            name,
            category_id
        });
        res.status(201).json({ message: "Subcategory created successfully" });
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
}

const getSubcategories = async (req: Request, res: Response): Promise<void> => {
    try{
        const subcategories = await Subcategory.find();
        res.status(200).json(subcategories);
    }catch(err){
        if (err instanceof Error) {
            res.status(500).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
        return ;
    }
}   

export default {
    createSubcategory,
    getSubcategories
}   
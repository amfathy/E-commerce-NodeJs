import { Request, Response, NextFunction } from "express";
import { Document, Model } from "mongoose";
import { Pagination } from "../utils/Pagination";

export const getEntity = <T extends Document>(model: Model<T>) => 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const data = await model.findById(id);
      if (!data) {
        res.status(404).json({ Message: "Wrong Id" });
        return;
      }
      res.status(201).json({ Messaga: "Found successfully", Data: data });
      return;
    } catch (err) {}
  };


export const getAllEntities = <T extends Document>(model: Model<T>) => 
  async (req: Request, res: Response): Promise<void> => {
    const pageNumber = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const query: Record<string, any> = { ...req.query };
    const data = await Pagination(model, pageNumber, limit, query);
    if (!data.success) {
      res.status(404).json(data.message);
    }
    res.status(200).json({ message: "retrived successfully", Data: data });
  };


export const updateEntity =
  <T extends Document>(model: Model<T>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const updatedField = await model.findByIdAndUpdate(id, req.body, {
      new: true,
    });


    if (!updatedField) {
      res.status(404).json({ message: "No document found with this ID" });
      return;
    }
    res
      .status(200)
      .json({ message: "Updated successfully", data: updatedField });
  };

export const createEntity = <T extends Document>(model: Model<T>) => 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const doc = await Model.create(req.body);
      if (!doc) res.status(400).json({ message: "Error in creation" });
      res.status(201).json({ message: "Created successfully", data: doc });
    } catch (err) {
      res.status(400).json({ message: "Bad Request", error: err });
    }
  };

export const deleteEntity = <T extends Document>(model: Model<T>)=> 
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedField = await model.findByIdAndDelete(id);

      if (!deletedField) {
        res.status(404).json({ message: "No document found with this ID" });
        return;
      }

      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      res.status(400).json({ message: "Bad Request", error: err });
    }
  };

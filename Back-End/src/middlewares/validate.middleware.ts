import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateResource =
  (data: AnyZodObject) => (req: Request, res: Response, next: NextFunction):void=> {
    try {
      data.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      console.log("Validation passed ✅");
      next();
    } catch (e: any) {
      res.status(400).send(e.errors);
    }
};

export default validateResource ; 

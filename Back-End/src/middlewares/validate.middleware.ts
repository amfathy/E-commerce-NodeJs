import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validateResource =
  (data: AnyZodObject) => (req: Request, res: Response, next: NextFunction):Promise<void> | undefined=> {
    try {
      data.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      res.status(400).send(e.errors);
      return Promise.resolve();
    }
};

export default validateResource ; 

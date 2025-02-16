import { Request, Response, NextFunction } from "express";

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ErrMessage = err.message || "Internal server Error";
    const status = 500;
    const stack = process.env.Node_ENV === "development" ? err.stack : {};
    res.status(status).json({ Messaga: ErrMessage, Stack: stack });
  } catch (err) {
    if (err instanceof Error) throw new Error(err.message);
    else throw new Error("exception error in error middleware");
  }
};

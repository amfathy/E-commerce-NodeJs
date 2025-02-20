import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import AuthRequest from "../interfaces/AuthRequest"

dotenv.config();

class Authorization {
  async IsAdmin(req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
         res.status(401).json({ message: "Authorization token required" });
         return;
      }

      const secretKey = process.env.JWT_SECRET_KEY as string;
      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      if (!decoded.userId || typeof decoded.userId !== "string") {
         res.status(403).json({ message: "Invalid token payload" });
         return;
      }

      if (!decoded.role || decoded.role !== "admin") {
         res.status(403).json({ message: "Access denied. Admins only." });
         return;
      }

      req.user = { userId: decoded.userId, role: decoded.role }; // Attach user info to request

      next();
    } catch (error) {
       res.status(401).json({ message: "Invalid or expired token" });
       return;
    }
  }

  async IsUser(req: AuthRequest, res: Response, next: NextFunction) : Promise<void> {
    try {
      const token = req.header("Authorization")?.replace("Bearer ", "");
      
      if (!token) {
         res.status(401).json({ message: "Authorization token required" });
         return;
      }

      const secretKey = process.env.JWT_SECRET_KEY as string;
      const decoded = jwt.verify(token, secretKey) as jwt.JwtPayload;

      if (!decoded.userId || typeof decoded.userId !== "string") {
         res.status(403).json({ message: "Invalid token payload" });
         return;
      }

      if (!decoded.role || decoded.role !== "user") {
         res.status(403).json({ message: "Access denied. users only." });
         return;
      }

      req.user = { userId: decoded.userId, role: decoded.role }; // Attach user info to request

      next();
    } catch (error) {
       res.status(401).json({ message: "Invalid or expired token" });
       return;
    }
  }
}

export default new Authorization;

import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


declare global {
    namespace Express {
      interface Request {
        userId?: string | number;
      }
    }
  }

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    console.log("header:", header); // Debug logging
    try {
        const decoded = jwt.verify(header as string, JWT_SECRET) as { id: string | number };
        if (decoded) {
            req.userId = decoded.id;
            next();
        }
    } catch (error) {
        res.status(403).json({
            message: "Unauthorized"
        });
    }
}
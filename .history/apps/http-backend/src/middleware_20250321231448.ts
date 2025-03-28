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
    const header = req.headers["authorization"] ?? "";

    try {
        const decoded = jwt.verify(header , JWT_SECRET) as { id: string | number };
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
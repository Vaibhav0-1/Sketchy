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

interface JwtPayload {
    userId: string | number;
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"] ?? "";

    try {
        const decoded = jwt.verify(header, JWT_SECRET) as JwtPayload;
        if (decoded) {
            req.userId = decoded.userId;
            next();
        }
    } catch (error) {
        res.status(403).json({
            message: "Unauthorized"
        });
    }
}
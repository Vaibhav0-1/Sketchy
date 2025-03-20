import { Request, Response, NextFunction } from 'express';

export const middleware: any(req: Request, res: Response, next: NextFunction): any{
    const token = req.headers["authorization"];
}
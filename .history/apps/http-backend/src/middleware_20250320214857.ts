import { Request, Response, NextFunction } from 'express';

export const middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization;
}
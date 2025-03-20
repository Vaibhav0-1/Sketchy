import { Request, Response, NextFunction } from 'express';

export function  middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"];
}
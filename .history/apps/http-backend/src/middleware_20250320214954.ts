import { Request, Response, NextFunction } from 'express';

export const middlewarey(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"];
}
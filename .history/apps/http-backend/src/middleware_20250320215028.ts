import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

export function  middleware(req: Request, res: Response, next: NextFunction){
    const token = req.headers["authorization"];

    if()
}
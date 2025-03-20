import express from 'express';
import jwt from "jsonwebtoken";
import { userMiddleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateUserSchema } from '@repo/common/src';
 

const app = express();

app.post("/signup", (req,res)=> {

    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Invalid data"
        })
        return;

    }
    res.json({
        userId: 123
    })
})

app.post("/signin", (req,res)=> {

    const data = siSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Invalid data"
        })
        return;

    }
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})

app.post("/room", userMiddleware, (req,res)=> {
    res.json({
        roomId: 123
    })
})


app.listen(3001);
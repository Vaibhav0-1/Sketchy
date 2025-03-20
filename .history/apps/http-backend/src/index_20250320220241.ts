import express from 'express';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from './config';
import { userMiddleware } from './middleware';
 

const app = express();

app.post("/signup", (req,res)=> {
    res.json({
        userId
    })
})

app.post("/signin", (req,res)=> {
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})

app.post("/room", (req,res)=> {

})


app.listen(3001);
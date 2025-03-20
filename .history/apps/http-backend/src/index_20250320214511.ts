import express from 'express';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from './config';
 

const app = express();

app.post("/signup", (req,res)=> {
    const body = req.body;
    const token = jwt.sign({username: body.username}, JWT_SECRET)
})

app.post("/signin", (req,res)=> {
    const userId = 1;
    const token = jwt.sign({
        userId
    })
})

app.post("/room", (req,res)=> {

})


app.listen(3001);
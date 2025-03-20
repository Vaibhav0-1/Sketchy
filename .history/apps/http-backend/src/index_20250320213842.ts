import express from 'express';
import jwt from "jsonwebtoken";

const app = express();

app.post("/signup", (req,res)=> {
    const body = req.body;
    const token = jwt.sign({username: body.username}, )
})

app.post("/signin", (req,res)=> {

})

app.post("/room", (req,res)=> {

})


app.listen(3001);
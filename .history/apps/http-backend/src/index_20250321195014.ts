import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { userMiddleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateUserSchema, RoomSchema, SigninSchema } from '@repo/common/src';
import { prismaClient } from '@repo/database/client';


const app = express();
app.use(express.json());
//@ts-ignore
app.post("/signup", async(req: express.Request, res: express.Response)=> {

    const parsedData = CreateUserSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message: "Invalid data"
        })
    }
    try{
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e){
        res.status(411).json({
            message: "User already exists"
        })``
    }
})


//@ts-ignore
app.post("/signin", async(req, res)=> {

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message: "Invalid data"
        })

    }
    await prismaClient.user.findFirst({
        where: {
            email: parsedData.data?.username,
            password: parsedData.data.password,

        },
        select: {
            id: true,
        },

    })
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})
//@ts-ignore
app.post("/room", userMiddleware, (req, res) => {
    const data = RoomSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Invalid data"
        })
        return;

    }
    res.json({
        roomId: 123
    })
})


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!'
    });
});


app.listen(3001);
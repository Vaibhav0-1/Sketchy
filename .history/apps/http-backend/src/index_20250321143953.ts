import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { userMiddleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateUserSchema, RoomSchema, SigninSchema } from '@repo/common/src';


const app = express();
app.use(express.json());

app.post("/signup", (req: Request, res: Response)=> {

    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Invalid data"
        })

    }
    res.json({
        userId: 123
    })
})

app.post("/signin", (req, res)=> {

    const data = SigninSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message: "Invalid data"
        })

    }
    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token
    })
})

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
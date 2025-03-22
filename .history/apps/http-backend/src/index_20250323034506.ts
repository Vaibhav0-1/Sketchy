import express, { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import { userMiddleware } from './middleware';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateUserSchema, RoomSchema, SigninSchema } from '@repo/common/src';
import { prismaClient } from '@repo/database/client';
import bcrypt from 'bcrypt';


const SALT_ROUNDS = 10;


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

        const hashedPassword = await bcrypt.hash(parsedData.data.password, SALT_ROUNDS);

        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.username,
                password: hashedPassword,
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e){
        res.status(411).json({
            message: "User already exists"
        })
    }
})


//@ts-ignore
app.post("/signin", async(req, res)=> {

    const parsedData = SigninSchema.safeParse(req.body);
    if(!parsedData.success){
        return res.json({
            message: "Invalid credentials"
        })

    }
    const user = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username,

        },
        select: {
            id: true,
            password: true
        }
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const passwordMatch = await bcrypt.compare(parsedData.data.password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }


    const token = jwt.sign({
        userId: user.id
    }, JWT_SECRET);

    res.json({
        token
    })
})
//@ts-ignore
app.post("/room", userMiddleware, async (req, res) => {
    const parsedData = RoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    const userId = req.userId?.toString();
    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})

app.get("/chats/:roomId", async(req,res) => {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where: {
            roomId: roomId
        },
        orderBy: {
            id: "desc"
        },
        take: 50
    });

    res.json({
        messages
    })
})

app.get("/room/:slug", async(req,res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug: slug
        }
    });

})





app.listen(3001);
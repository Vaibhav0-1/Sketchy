import { WebSocketServer, WebSocket } from "ws";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/database/client";


const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket,
    rooms: string[],
    userId: string
}
const users: User[] = [];

function checkUser(token: string): string | null {
    const decoded = jwt.verify(token, JWT_SECRET);

    if(typeof decoded == "string"){
        return null;
    }

    if(!decoded || !(decoded).userId){
        return null;
    }

    return decoded.userId;
}

 

wss.on('connection', function connection(ws, request){
    const url = request.url;
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if(userId == null){
        ws.close();
        return null;
    }

    users.push({
        userId,
        rooms: [],
        ws
    })



    ws.on('message', async function message(data){
        let parsedData;
        if(typeof data !== "string"){
            parsedData = JSON.parse(data.toString());
        }else{
            parsedData = JSON.parse(data);
        }

        if(parsedData.type === "join_room"){
            const user = users.find(x => x.ws === ws);
            user?.rooms.push(parsedData.roomId);
        }
        if(parsedData.type === "leave_room"){
            const user = users.find(x => x.ws === ws);
            if(!user) {
                return;
            }
            user.rooms = user?.rooms.filter(x => x === parsedData.room);
        }
        if(parsedData.type === "chat"){
            //do 10 checks that message is valid, user is in room, etc
            const user = users.find(x => x.ws === ws);
            if(!user) {
                return;
            }
            const roomId = parseInt(parsedData.roomId); 
            if(isNaN(roomId)) {
                console.error('Invalid room ID');
                return;
            }
            const message = parsedData.message;

            
            const existingRoom = await prismaClient.room.findUnique({
                where: { id: roomId }
            });

            if (!existingRoom) {
                console.error(`Room with ID ${roomId} does not exist.`);
                return;
            }
            const existingUser = await prismaClient.user.findUnique({
                where: { id: userId }
            });

            if (!existingUser) {
                console.error(`User with ID ${userId} does not exist.`);
                return;
            }

            await prismaClient.chat.create({
                data: {
                    roomId,
                    message,
                    userId
                }
            })

            users.forEach(user => {
                if(user.rooms.includes(roomId.toString())){
                    user.ws.send(JSON.stringify({
                        type: "chat",
                        message: message,
                        roomId
                    }))
                }
            })
        }
    });
});
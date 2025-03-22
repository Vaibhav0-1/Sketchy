import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        return decoded.userId;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

wss.on('connection', function connection(ws, request) {
    const url = request.url;
    if (!url) {
        ws.close();
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";
    const userId = checkUser(token);

    if (userId == null) {
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms: [],
        ws
    });

    ws.on('message', function message(data) {
        try {
            const parsedData = JSON.parse(data.toString());

            if (parsedData.type === "join_room") {
                const user = users.find(x => x.userId === userId);
                if (user) {
                    user.rooms.push(parsedData.roomId);
                }
            }

            if (parsedData.type === "leave_room") {
                const user = users.find(x => x.userId === userId);
                if (user) {
                    user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
                }
            }

            if (parsedData.type === "chat") {
                const user = users.find(x => x.userId === userId);
                if (!user) {
                    return;
                }

                const roomId = parsedData.roomId;
                const message = parsedData.message;

                if (!user.rooms.includes(roomId)) {
                    console.log("User not in room:", roomId);
                    return;
                }

                users.forEach(u => {
                    if (u.rooms.includes(roomId)) {
                        u.ws.send(JSON.stringify({
                            type: "chat",
                            message: message,
                            roomId
                        }));
                    }
                });
            }
        } catch (error) {
            console.error("Error parsing message:", error);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
    });
});
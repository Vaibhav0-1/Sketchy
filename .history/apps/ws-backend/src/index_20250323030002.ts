import { WebSocketServer, WebSocket } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

interface User {
    ws: WebSocket;
    rooms: string[];
    userId: string;
}

const users: { userId: string; ws: WebSocket; rooms: string[] }[] = [];

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

    // Add user to the list of connected users
    users.push({ userId: userId, ws: ws, rooms: [] });
    console.log(`User ${userId} connected`);

    ws.on('message', function message(data) {
        try {
            const parsedData = JSON.parse(data.toString());
            const type = parsedData.type;

            if (type === "join_room") {
                const roomId = parsedData.roomId;
                if (typeof roomId !== 'string') {
                    console.error("Invalid roomId:", roomId);
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid roomId' }));
                    return;
                }
                const user = users.find(x => x.userId === userId);
                if (user) {
                    user.rooms.push(roomId);
                    console.log(`User ${userId} joined room ${roomId}`);
                }
            } else if (type === "leave_room") {
                const roomId = parsedData.roomId;
                const user = users.find(x => x.userId === userId);
                if (user) {
                    user.rooms = user.rooms.filter(x => x !== roomId);
                    console.log(`User ${userId} left room ${roomId}`);
                }
            } else if (type === "chat") {
                const roomId = parsedData.roomId;
                const message = parsedData.message;

                if (typeof roomId !== 'string' || typeof message !== 'string') {
                    console.error("Invalid roomId or message:", roomId, message);
                    ws.send(JSON.stringify({ type: 'error', message: 'Invalid roomId or message' }));
                    return;
                }

                const user = users.find(x => x.userId === userId);
                if (!user) {
                    console.log(`User ${userId} not found`);
                    return;
                }

                if (!user.rooms.includes(roomId)) {
                    console.log(`User ${userId} not in room ${roomId}`);
                    return;
                }

                // Broadcast the message to all users in the room
                users.forEach(u => {
                    if (u.rooms.includes(roomId)) {
                        u.ws.send(JSON.stringify({
                            type: "chat",
                            userId: userId, // Include userId in the chat message
                            message: message,
                            roomId: roomId
                        }));
                    }
                });
            } else {
                console.log("Unknown message type:", type);
                ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
            }
        } catch (error) {
            console.error("Error parsing message:", error);
            ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
        }
    });

    ws.on('close', () => {
        // Remove the user from the list of connected users
        const index = users.findIndex(u => u.userId === userId);
        if (index !== -1) {
            users.splice(index, 1);
            console.log(`User ${userId} disconnected`);
        }
    });
});
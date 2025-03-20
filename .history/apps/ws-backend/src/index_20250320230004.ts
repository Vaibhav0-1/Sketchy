import { WebSocketServer } from "ws";
import { Jwt } from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request){
    const url = request.url;
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token');
    const decoded = JWT_SECRET.verify

    ws.on('message', function message(data){
        ws.send('pong');
    });
});
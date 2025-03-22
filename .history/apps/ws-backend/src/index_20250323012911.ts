import { WebSocketServer } from "ws";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): boolean {
    
}

 

wss.on('connection', function connection(ws, request){
    const url = request.url;
    if(!url){
        return;
    }

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || "";


    ws.on('message', function message(data){
        ws.send('pong');
    });
});
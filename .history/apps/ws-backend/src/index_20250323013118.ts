import { WebSocketServer } from "ws";
import  jwt, { JwtPayload }  from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';

const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): boolean {
    const decoded = jwt.verify(token, JWT_SECRET);

    if(typeof decoded == "string"){
        return null;
    }

    if(!decoded || !(decoded).userId){
        return null;
    }

    return true;
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
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request){
    const url = request.url;
    if(!url){
        return;
    }

    const 

    ws.on('message', function message(data){
        ws.send('pong');
    });
});
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request){
    const url = request.url

    ws.on('message', function message(data){
        ws.send('pong');
    });
});
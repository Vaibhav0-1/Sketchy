import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

 export function Canvas({roomId} : {roomId: string}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const socket = useRef<WebSocket>();

    useEffect(() => {
        if(canvasRef.current){
            socket.current = new WebSocket('ws://localhost:3000');
            initDraw(canvasRef.current, roomId, socket.current);
        }
    },[canvasRef]);

    return <div>
    <canvas ref={canvasRef} width={2000} height={1000}/>
    </div>
}
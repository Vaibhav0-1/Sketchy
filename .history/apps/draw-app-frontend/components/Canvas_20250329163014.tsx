import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

 export function Canvas({roomId} : {roomId: string}){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current){

            initDraw(canvasRef.current, roomId, socket:WebSocket);
        }
    },[canvasRef]);

    return <div>
    <canvas ref={canvasRef} width={2000} height={1000}/>
    </div>
}
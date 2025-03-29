"use client"

import { WS_URL } from "@/config";
import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";

export function Canvas({roomId}: {roomId: string}){
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const [ socket, setSocket ] = useState<WebSocket | null>(null);

        useEffect(() => {
            const ws = new WebSocket(WS_URL)

            ws.onopen = () => {
                setSocket(ws)
            }
        },[])


        useEffect(() => {
            if(canvasRef.current){
    
    
                initDraw(canvasRef.current, roomId);
            }
        },[canvasRef]);

        if(!socket){
            
        }

        return <div>
        <canvas ref={canvasRef} width={2000} height={1000}/>
        <div className="absolute top-0 right-0">
            <div className="flex space-x-1.5">
            <div className="bg-amber-400 text=black rounded shadow-xl">Rect</div>
            <div  className="bg-amber-400 text=black rounded shadow-xl">Circle</div>
            </div>
        </div>
    </div>
}

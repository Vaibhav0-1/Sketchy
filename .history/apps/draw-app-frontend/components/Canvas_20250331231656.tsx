import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";
import { useDimensions } from "react-hook-dimensions";

interface DimensionsReturn {
    width: number;
    height: number;
    top: number;
    left: number;
    x: number;
    y: number;
}

 export function Canvas({roomId, socket} : {roomId: string, socket: WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const dimensions = useDimensions(containerRef);

    useEffect(() => {
        if(canvasRef.current){

            initDraw(canvasRef.current, roomId, socket);
        }
    },[canvasRef]);

    return (
        <div ref={containerRef} className="w-full h-screen">
            <canvas 
                ref={canvasRef} 
                width={width} 
                height={height}
                style={{
                    display: 'block', // Removes bottom margin
                    backgroundColor: 'black'
                }}
            />
        </div>
    );
}
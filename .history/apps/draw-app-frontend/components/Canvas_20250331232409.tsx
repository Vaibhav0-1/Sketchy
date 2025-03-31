import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";
import { useDimensions } from "react-hook-dimensions";

 export function Canvas({roomId, socket} : {roomId: string, socket: WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { dimensions } = useDimensions(canvasWrapperRef)

    useEffect(() => {
        if(canvasRef.current && dimensions){

            canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;

            initDraw(canvasRef.current, roomId, socket);
        }
    },[canvasRef]);

    return <div>
    <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>
    //this is will create error while resizing and we need to re render whenever we rerender use react hook window dimensions
    </div>
}
"use client";
import { useEffect, useRef } from "react"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    

    useEffect(() => {
        if(canvasRef.current){
            const  canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
    
            if(!ctx){
                return
            }
            initDraw(ctx, c);
        }
    },[canvasRef]);
    
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}/>
    </div>
}
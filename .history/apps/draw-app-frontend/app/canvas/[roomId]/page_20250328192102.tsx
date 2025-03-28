"use client";
import { useEffect, useRef } from "react"
import { ini}

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    

    useEffect(() => {
        if(canvasRef.current){


            initDraw(canvas);
        }
    },[canvasRef]);
    
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}/>
    </div>
}
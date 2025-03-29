"use client";
import { useEffect, useRef } from "react"
import { initDraw } from "@/draw"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    

    useEffect(() => {
        if(canvasRef.current){


            initDraw(canvasRef.current);
        }
    },[canvasRef]);
    
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}/>
        <div className="absolute top-0 right-0">
            <div className="flex space-x-0">
            <div className="bg-amber-400 text=black rounded shadow-xl">Rect</div>
            <div  className="bg-amber-400 text=black rounded shadow-xl">Circle</div>
            </div>
        </div>
    </div>
}
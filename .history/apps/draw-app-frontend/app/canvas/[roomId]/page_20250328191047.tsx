"use client";
import { useEffect, useRef } from "react"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    

    useEffect(() => {
        
    },[canvasRef]);
    
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}/>
    </div>
}
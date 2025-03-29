"use-client"

import { useEffect, useRef } from "react";

export function Canvas(){
     const canvasRef = useRef<HTMLCanvasElement>(null);
        useEffect(() => {
            if(canvasRef.current){
    
    
                initDraw(canvasRef.current);
            }
        },[canvasRef]);
}
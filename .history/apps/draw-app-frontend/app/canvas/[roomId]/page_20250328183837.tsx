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

            let clicked = false;
            let startX = 0;
            let startY = 0;

            canvas.addEventListener("mousedown", (e) => {
                clicked = true;
                startX = e.clientXstart
            })
            canvas.addEventListener("mouseup",(e) => {
                clicked = false;

                console.log(e.clientX)
                console.log(e.clientY)
            })

            canvas.addEventListener("mousemove",(e) => {
                if(clicked){
                    console.log(e.clientX)
                    console.log(e.clientY)
                }


            })

            
        }
    },[canvasRef])
    
    return <div>
        <canvas ref={canvasRef} width={500} height={500}/>
    </div>
}
"use client";
import { useEffect, useRef } from "react"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);

    

    useEffect(() => {
        if(canvasRef.current){
            const  canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");

            ctx.fillStyle = "rgba(0,0,0)"
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            if(!ctx){
                return
            }

            ctx.fillStyle = "rgba(0,0,0)"
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            let clicked = false;
            let startX = 0;
            let startY = 0;

            canvas.addEventListener("mousedown", (e) => {
                clicked = true;
                startX = e.clientX
                startY = e.clientY
            })
            canvas.addEventListener("mouseup",(e) => {
                clicked = false;

                console.log(e.clientX)
                console.log(e.clientY)
            })

            canvas.addEventListener("mousemove",(e) => {
                if(clicked){
                    const width = e.clientX - startX;
                    const height = e.clientY - startY;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.fillStyle = "rgba(255,255,255)"
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.strokeStyle = "rgba(0,0,0)"
                    ctx.strokeRect(startX, startY, width, height);
                }
            })
        }
    },[canvasRef])
    
    return <div>
        <canvas ref={canvasRef} width={2000} height={1000}/>
    </div>
}
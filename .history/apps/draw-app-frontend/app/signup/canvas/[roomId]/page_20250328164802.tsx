import { useEffect, useRef } from "react"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {
        if(canvasRef.current){
            
        }
    })
    return <div>
        <canvas ref={canvasRef} width={500} height={500}/>
    </div>
}
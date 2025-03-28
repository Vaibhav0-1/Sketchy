import { useEffect, useRef } from "react"

export default function Canvas(){
    const canvasRef = useRef<HTMLCanvasElement>(null);


    useEffect(() => {

    })
    return <div>
        <canvas ref width={500} height={500}/>
    </div>
}
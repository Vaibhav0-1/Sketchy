import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";
import useDimensions"@/hooks/useDimensions" from ; 

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [ref, dimensions] = useDimensions({ liveMeasure: true });

    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket);
        }
    }, [canvasRef, dimensions]); // Rerun when dimensions change

    return (
        <div ref={ref}>
            <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} />
        </div>
    );
}

import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";
import useDimension from "@/hooks/useDimension";

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useDimension(canvasRef);

  const canvasWidth = width || window.innerWidth;
  const canvasHeight = height || window.innerHeight;

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef, width, height]); // Re-run when dimensions change

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height} />
    </div>
  );
}

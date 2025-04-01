import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";
import useDimensions from "@/hooks/useDimension";

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ref, dimensions] = useDimensions({ liveMeasure: true });

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef, dimensions]);

  return (
    <div ref={ref}>
      <canvas ref={canvasRef} width={(dimensions as DimensionObject).width || 800} height={dimensions.height || 600} />
    </div>
  );
}

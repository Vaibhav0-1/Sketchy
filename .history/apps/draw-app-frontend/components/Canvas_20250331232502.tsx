import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";
import { useDimensions } from "react-hook-dimensions";

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { dimensions } = useDimensions(canvasWrapperRef);

  useEffect(() => {
    if (canvasRef.current && dimensions) {
      // Reset canvas dimensions when container dimensions change
      canvasRef.current.width = dimensions.width;
      canvasRef.current.height = dimensions.height;
      
      // Re-initialize drawing with new dimensions
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasRef, dimensions, roomId, socket]);

  return (
    <div ref={canvasWrapperRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}
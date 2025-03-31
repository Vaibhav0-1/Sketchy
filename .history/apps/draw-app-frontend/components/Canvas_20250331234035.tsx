import { initDraw } from "@/draw";
import { useEffect, useRef } from "react";

export function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initial setup
    const canvas = canvasRef.current;
    updateCanvasDimensions();
    initDraw(canvas, roomId, socket);
    
    // Setup resize handler
    function updateCanvasDimensions() {
      if (canvas) {
        canvas.width = canvas.offsetWidth || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
      }
    }
    
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasDimensions();
      // Re-initialize or update drawing as needed
      initDraw(canvas, roomId, socket);
    });
    
    resizeObserver.observe(canvas);
    window.addEventListener('resize', updateCanvasDimensions);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateCanvasDimensions);
    };
  }, [roomId, socket]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}
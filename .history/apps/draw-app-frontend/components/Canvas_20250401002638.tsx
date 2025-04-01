import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import useDimension from "@/hooks/useDimension";

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useDimension(canvasRef);

  // State to store the canvas size
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  // This effect listens for window resizing and updates canvas size accordingly
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Attach the event listener on mount
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means it runs only once on mount

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasSize, roomId, socket]); // Re-run drawing logic when canvas size changes

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ background: "#f0f0f0" }}
      />
    </div>
  );
}

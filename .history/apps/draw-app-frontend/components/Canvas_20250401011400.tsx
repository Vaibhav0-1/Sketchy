import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import useDimension from "@/hooks/useDimension";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useDimension(canvasRef);

  
  const [canvasSize, setCanvasSize] = useState({ width: window.innerWidth, height: window.innerHeight });

 
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  useEffect(() => {
    if (canvasRef.current) {
      initDraw(canvasRef.current, roomId, socket);
    }
  }, [canvasSize, roomId, socket]); 

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ background: "#f0f0f0" }}
      />
      <Topbar/>
    </div>
  );
}

function Topbar() {
    return (
        <div
            style={{
                position: "fixed",
                top: 10,
                left: "50%",
                transform: "translateX(-50%)", // Centers the entire Topbar
                display: "flex",
                alignItems: "center", // Centers icons vertically
                justifyContent: "center", // Centers icons horizontally
                gap: "10px", // Adds spacing between icons
                backgroundColor: "#fff", // Optional: Background color
                padding: "8px 16px", // Optional: Padding for better visibility
                borderRadius: "8px", // Optional: Rounded corners
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", // Optional: Shadow effect
            }}
        >
            <IconButton icon={<Pencil />} onClick={() => {}} />
            <IconButton icon={<RectangleHorizontalIcon />} onClick={() => {}} />
            <IconButton icon={<Circle />} onClick={() => {}} />
        </div>
    );
}


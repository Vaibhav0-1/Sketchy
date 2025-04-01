import { initDraw } from "@/draw";
import { useEffect, useRef, useState } from "react";
import useDimension from "@/hooks/useDimension";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";

type Shape = "circle" | "rect" | "pencil"

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = useDimension(canvasRef);
  const [selectedTool, setSelectedTool] = useState("circle")

  
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
      <Topbar selectedTool = {selectedTool}/>
    </div>
  );
}

function Topbar({selectedTool,setSelectedTool} : {selectedTool : Shape, setSelectedTool: (s : Shape) => void }){
    return <div style={{
        position:"fixed",
        top:10,
        left: "50%",
        alignItems: "center", 
        justifyContent: "center", 
        gap: "10px",
        
    }}>

        <div className="flex gap-t">
        <IconButton activated= {selectedTool == "pencil"} icon={<Pencil/>} onClick={() => { setSelectedTool()}}></IconButton>
        <IconButton activated= {selectedTool == "rect"} icon={<RectangleHorizontalIcon/>} onClick={() => {}}></IconButton>
        <IconButton activated= {selectedTool == "circle"} icon={<Circle/>} onClick={() => {}}></IconButton>
        </div>

    </div>
}

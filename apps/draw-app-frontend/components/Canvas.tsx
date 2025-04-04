import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon, PenLine } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "line" | "pencil" 

export function Canvas({ roomId, socket }: { roomId: string; socket: WebSocket }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [game, setGame] = useState<Game>();
  const [selectedTool, setSelectedTool] = useState<Tool>("circle")

  useEffect(() => {
    game?.setTool(selectedTool)
  },[selectedTool, game])

  
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
        const g = new Game(canvasRef.current, roomId, socket);
        setGame(g);

        return () => {
            g.destroy();
        }
    }
  }, [canvasRef, roomId, socket]); 



  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ background: "#f0f0f0" }}
      />
      <Topbar setSelectedTool = {setSelectedTool} selectedTool={selectedTool}/>
    </div>
  );
}

function Topbar({selectedTool,setSelectedTool} : {selectedTool : Tool, setSelectedTool: (s : Tool) => void }){
    return <div style={{
        position:"fixed",
        top:10,
        left: "50%",
        alignItems: "center", 
        justifyContent: "center", 
        gap: "10px",
        
    }}>

        <div className="flex gap-t">
        <IconButton activated= {selectedTool === "line"} icon={<PenLine/>} onClick={() => { setSelectedTool("line")}}></IconButton>

        <IconButton activated= {selectedTool === "rect"} icon={<RectangleHorizontalIcon/>} onClick={() => {setSelectedTool("rect")}}></IconButton>

        <IconButton activated= {selectedTool === "circle"} icon={<Circle/>} onClick={() => {setSelectedTool("circle")}}></IconButton>

        <IconButton activated={selectedTool === "pencil"} icon={<Pencil/>} onClick={() => setSelectedTool("pencil")}></IconButton>
        </div>

        
    </div>
}

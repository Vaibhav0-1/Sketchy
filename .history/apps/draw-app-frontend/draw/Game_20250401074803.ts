import { Shape} from "./types";
import { getExistingShapes } from "./http";
import { Tool } from "@/components/Canvas";

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = []
    private roomId: string;
    socket: WebSocket;
    private clicked: boolean
    private startX: number;
    private startY: number;
    private prevX: number;
    private prevY: number;
    private selectedTool: Tool = "circle"


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.shapes = []
        this.roomId = roomId;
        this.socket = socket
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
        this.clicked = false;
        this.startX = 0;
        this.startY = 0;
        this.prevX = 0;
        this.prevY = 0;

    }
    destroy(){
        this.canvas.removeEventListener("mousedown", this.mouseDownHandler);
    
        this.canvas.removeEventListener("mouseup", this.mouseUpHandler);

        this.canvas.removeEventListener("mousemove", this.mouseMoveHandler);
    }


    setTool(tool: "circle" | "pencil" | "rect"){
        this.selectedTool = tool;
    }

    async init(){
        this.shapes = await getExistingShapes(this.roomId);
        this.clearCanvas();
    }

    async initHandlers(){
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            if(message.type == "chat"){
                const parsedShape = JSON.parse(message.message)
                this.shapes.push(parsedShape.shape)
                this.clearCanvas();
            }
        }
    }

    private clearCanvas(): void {
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        
        this.shapes.forEach(shape => this.drawShape(shape));
    }

    mouseDownHandler(e: { clientX: number; clientY: number; }){
        this.clicked = true;
        this.startX = e.clientX
        this.startY = e.clientY
        this.prevX = e.clientX;
        this.prevY = e.clientY;
    }

    mouseUpHandler = (e: MouseEvent) => {
        if (!this.clicked) return;
            
        this.clicked = false;
        const dimensions = this.calculateDimensions(e);
        const shape = this.createShape(dimensions);

        if (!shape) return;

        this.addShape(shape);
        this.sendShapeToServer(shape);
    }

    mouseMoveHandler(e: MouseEvent){
        if (!this.clicked) return;
            
        const dimensions = this.calculateDimensions(e);
        const shape = this.createShape(dimensions);
        
        if (!shape) return;
        
        this.clearCanvas();
        this.drawShape(shape);
    }


    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", this.mouseDownHandler);
    
        this.canvas.addEventListener("mouseup", this.mouseUpHandler);

        this.canvas.addEventListener("mousemove", this.mouseMoveHandler);
}


private calculateDimensions(e: MouseEvent) {
    return {
        width: e.clientX - this.startX,
        height: e.clientY - this.startY
    };
}

private createShape(dimensions: { width: number, height: number }): Shape | null {
    const selectedTool = this.selectedTool;
    
    switch (selectedTool) {
        case "rect":
            return {
                type: "rect",
                x: this.startX,
                y: this.startY,
                width: dimensions.width,
                height: dimensions.height
            };
        case "circle":
            const radius = Math.max(dimensions.width, dimensions.height) / 2;
            return {
                type: "circle",
                radius,
                centerX: this.startX + radius,
                centerY: this.startY + radius
            };
        case "pencil":
            return {
                type: "pencil",
                startX: this.prevX,
                startY: this.prevY,
                endX: dimensions.width + this.startX,
                endY: dimensions.height + this.startY
            };
        default:
            return null;
    }
}

private drawShape(shape: Shape): void {
    this.ctx.strokeStyle = "rgba(255,255,255,1)";
    
    switch(shape.type) {
        case "rect":
            this.ctx.strokeRect(
                shape.x,
                shape.y,
                shape.width,
                shape.height
            );
            break;
        case "circle":
            this.ctx.beginPath();
            this.ctx.arc(
                shape.centerX,
                shape.centerY,
                shape.radius,
                0,
                Math.PI * 2
            );
            this.ctx.stroke();
            this.ctx.closePath();
            break;
        case "pencil":
            this.ctx.beginPath();
            this.ctx.moveTo(shape.startX, shape.startY);
            this.ctx.lineTo(shape.endX, shape.endY);
            this.ctx.stroke();
            this.ctx.closePath();
            break;
    }
}

private addShape(shape: Shape): void {
    this.shapes.push(shape);
    this.clearCanvas();
}

private sendShapeToServer(shape: Shape): void {
    this.socket.send(JSON.stringify({
        type: "chat",
        message: JSON.stringify({ shape }),
        roomId: this.roomId
    }));
}
                    
}
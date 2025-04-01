import { Shape} from "./types";
import { getExistingShapes } from "./http";

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = []
    private roomId: string;
    socket: WebSocket;
    private clicked: boolean
    private startX: number;
    private startY: number;


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

    }

    async init(){
        this.shapes = await getExistingShapes(this.roomId);
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

    clearCanvas(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.shapes.forEach(shape => {
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
        });
    }

    initMouseHandlers(){
        this.canvas.addEventListener("mousedown", (e) => {
            this.clicked = true;
            this.startX = e.clientX
            this.startY = e.clientY
        })
    
        this.canvas.addEventListener("mouseup", (e) => {
            if (!this.clicked) return;
            
            this.clicked = false;
            const dimensions = this.calculateDimensions(e);
            const shape = this.createShape(dimensions);

            if (!shape) return;

            this.addShape(shape);
            this.sendShapeToServer(shape);
        });
}
}

private calculateDimensions(e: MouseEvent) {
    return {
        width: e.clientX - this.startX,
        height: e.clientY - this.startY
    };
}

private createShape(dimensions: { width: number, height: number }): Shape | null {
    const selectedTool = (window as any).selectedTool;
    
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
        default:
            return null;
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
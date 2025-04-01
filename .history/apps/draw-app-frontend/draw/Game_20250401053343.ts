import { Shape} from "./types";
import { getExistingShapes } from "./http";

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = []
    private roomId: string;
    socket: WebSocket;


    constructor(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.shapes = []
        this.roomId = roomId;
        this.socket = socket
        this.init();
        this.initHandlers();
        this.initMouseHandlers();

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
        canvas.addEventListener("mousedown", (e) => {
            clicked = true;
            startX = e.clientX
            startY = e.clientY
        })
    }
                    
}
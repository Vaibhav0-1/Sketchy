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

    }

    async init(){
        this.shapes = await getExistingShapes(this.roomId);
    }

    async initHandlers(){
        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data)
            if(message.type == "chat"){
                const parsedShape = JSON.parse(message.message)
                existingShapes.push(parsedShape.shape)
                clearCanvas(existingShapes,canvas,ctx);
            }
        }
    }
}
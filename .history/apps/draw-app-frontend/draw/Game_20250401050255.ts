import { Shape} from "./types";
import { getExistingShapes } from "./http";

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = []
    private roomId

    constructor(canvas: HTMLCanvasElement, roomId: string){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.shapes = []
        this.roomId = roomId;
        this.init();

    }

    async init(){
        this.shapes = await getExistingShapes[roomId];
    }
}
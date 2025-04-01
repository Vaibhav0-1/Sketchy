import { Shape} from "./types";
import { getExistingShapes } from "./http";

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = []
    private roomId: string;

    constructor(canvas: HTMLCanvasElement, roomId: string, soc){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.shapes = []
        this.roomId = roomId;
        this.init();

    }

    async init(){
        this.shapes = await getExistingShapes(this.roomId);
    }
}
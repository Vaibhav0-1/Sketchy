import { Shape} from "./types";
import { getExistingShapes } from "./http";

export class Game {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private shapes: Shape[] = []

    constructor(canvas: HTMLCanvasElement, r){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.shapes = []
        this.init();

    }

    async init(){
        this.shapes = await getExistingShapes[roomId];
    }
}
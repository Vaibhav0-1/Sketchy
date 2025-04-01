export class Game{

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private existingShapes: Shape[];

    constructor(canvas: HTMLCanvasElement){
        this.canvas = canvas;
        const context = canvas.getContext("2d");
        if (!context) {
            throw new Error("2D context not supported or canvas already initialized");
        }
        this.ctx = context;
        this.init();

    }
}
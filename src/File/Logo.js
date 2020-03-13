
export default class Logo {
    constructor( canvas, ctx, Image ) {
        this.canvas = canvas;
        this.ctx = ctx,
        this.image = Image;

        this.width = Image.width;
        this.height = Image.height;

        this.scale = 1;

        this.dragging = false;

        this.offset = { x: 0, y: 0 }
        this.pos = { x: 0, y: 0 }
    }

    draw() {
        this.ctx.drawImage(
            this.image,
            0, 0,
            this.width, this.height,
            this.pos.x, this.pos.y,
            this.width * this.scale, this.height * this.scale
        )
    }

    update( mousePos ) {
        if ( this.dragging ) {
            this.pos.x = mousePos.x - this.offset.x;
            this.pos.y = mousePos.y - this.offset.y;
        }

        this.draw();
    }
}
class fichaApple extends Ficha {
    constructor(posX, posY, radius, fill, context) {
        super(posX, posY, fill, context);
        this.radius = radius;
    }

    draw() {
        super.draw();
        this.context.beginPath();
        this.context.arc(this.posX, this.posY, this.radius, 0, 2 * Math.PI);
        this.context.fill();

        if(this.resaltado === true){
            this.context.strokeStyle = this.resaltadoEstilo;
            this.context.lineWidth = 2;
            this.context.stroke();
        }
        this.context.closePath();
    }

    getRadius() {
        return this.radius;
    }

    isPointInside(x, y){
        let _x = this.posX - x;
        let _y = this.posY - y;
        return Math.sqrt(_x * _x + _y * _y)<this.radius;
    }
}
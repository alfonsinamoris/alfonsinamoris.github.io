let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

let isMouseDown = false;
let lastClickedFigure = null;
let figures = []

function addFigure() {
    if(figures.length < 29){
        addCircle();
        drawFigures();
    }
}


function findClickedFigure(x, y){
    for(let i = 0; i < figures.length; i++){
         const element = figures[i];
         if(element.isPointInside(x, y)){
            return element;
        }
    }
}
function drawFigures() {
    clearCanvas();
    for (let i = 0; i < figures.length; i++) {
        figures[i].draw(context);
    }
}

    let posY = 100;
function addCircle() {
    let posX = 100;
    let color = 'red';
    let circle = new Circle(posX, posY, 10, color, context);
    figures.push(circle);
    posY+=20;
}
function onMouseDown(e){
    isMouseDown = true;

    if(lastClickedFigure != null){
        lastClickedFigure.setResaltado(false);
        lastClickedFigure = null;
    }

    let clickFig = findClickedFigure(e.layerX, e.layerY);
    if(clickFig != null){
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
   drawFigures();
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFigure!=null){
        lastClickedFigure.setPosition(e.layerX, e.layerY);
      drawFigures();
    }

}

function onMouseUp(e){
    isMouseDown = false;
}

// Evento temporal para agregar figuras
function addFigures() {
    addFigure();
    if (figures.length < 30) {
        setTimeout(addFigures, 0);
    }
}

setTimeout(() => {
    addFigures();
}, 0)
// Fin Evento temporal para agregar figuras



function clearCanvas() {
    context.fillStyle = '#1D2429';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
}
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);
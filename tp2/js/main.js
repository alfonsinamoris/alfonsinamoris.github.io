window.onload = function () {

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

let isMouseDown = false;
let lastClickedFigure = null;
let figures = []

const tablero = new Tablero(80,6,7);
tablero.dibujarTablero(context, canvasWidth, canvasHeight);

function addFigure() {
    if(figures.length < 21){
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
    tablero.dibujarTablero(context,canvasWidth,canvasHeight);
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
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let clickFig = findClickedFigure(x, y);
    if(clickFig != null){
        clickFig.setResaltado(true);
        lastClickedFigure = clickFig;
    }
   drawFigures();
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFigure!=null){
        const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
        lastClickedFigure.setPosition(x,y);
      drawFigures();
    }

}

function onMouseUp(e){
    isMouseDown = false;
}

// Evento temporal para agregar figuras
function addFigures() {
    addFigure();
    if (figures.length < 21) {
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

}
window.onload = function () {

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

let isMouseDown = false;
let lastClickedFigure = null;
let fichas = []
const cant_fichas = 42;

const tablero = new Tablero(80,6,7);
tablero.dibujarTablero(context, canvasWidth, canvasHeight);

function addFicha() {
    if(fichas.length < cant_fichas/2){
        addFichaApple();
    }else{
        addFichaAndroid();
    }
        drawFichas();
    
}


function findClickedFicha(x, y){
    for(let i = 0; i < fichas.length; i++){
         const element = fichas[i];
         if(element.isPointInside(x, y)){
            return element;
        }
    }
}

function drawFichas() {
    clearCanvas();
    tablero.dibujarTablero(context,canvasWidth,canvasHeight);
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw(context);
    }
}

let posY = 100;

function addFichaApple() {
    let posX = 100;
    let color = 'red';
    let apple = new fichaApple(posX, posY, 10, color, context);
    fichas.push(apple);
    posY+=20;
}

function addFichaAndroid() {
    let posX = 800;
    let color = 'green';
    let android = new fichaAndroid(posX, posY, 10, color, context);
    fichas.push(android);
    posY+=20;
}

function onMouseDown(e){
    isMouseDown = true;

    if(lastClickedFicha != null){
        lastClickedFicha.setResaltado(false);
        lastClickedFicha = null;
    }
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    let clickFig = findClickedFicha(x, y);
    if(clickFig != null){
        clickFig.setResaltado(true);
        lastClickedFicha = clickFig;
    }
   drawFichas();
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFicha!=null){
        const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
        lastClickedFicha.setPosition(x,y);
      drawFichas();
    }

}

function onMouseUp(e){
    isMouseDown = false;
}

// Evento temporal para agregar figuras
function addFichas() {
    addFicha();
    if (fichas.length < cant_fichas) {
        setTimeout(addFichas, 0);
    }
}

setTimeout(() => {
    addFichas();
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
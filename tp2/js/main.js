window.onload = function () {

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

let isMouseDown = false;
let lastClickedFicha = null;
let fichas = []
const cant_fichas = 42;

let image = new Image();
image.src = 'images/apple.svg';

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
    for(let i = fichas.length - 1; i >=0; i--){
         const element = fichas[i];
         if(element.isPointInside(x, y)){
            return element;
        }
    }
    return null;
}

function drawFichas() {
    clearCanvas();
    tablero.dibujarTablero(context,canvasWidth,canvasHeight);
    for (let i = 0; i < fichas.length; i++) {
        fichas[i].draw(context);
    }
}

let posYApple = 100;

function addFichaApple() {
    let posX = 100;
    let color = 'red';
    let apple = new fichaApple(posX, posYApple, 30, color, context);
    fichas.push(apple);
    posYApple+=20;
}
let posYAndroid=100;
function addFichaAndroid() {
    let posX = 800;
    let color = 'green';
    let android = new fichaAndroid(posX, posYAndroid, 30, color, context);
    fichas.push(android);
    posYAndroid+=20;
}

function onMouseDown(e){
    isMouseDown = true;

    if(lastClickedFicha != null){
        lastClickedFicha.setResaltado(false);
        lastClickedFicha = null;
    }
    //captura pos en x e y donde hago click
    const x = e.offsetX;
    const y = e.offsetY;
    console.log(x);
    console.log(y);

    let clickFig = findClickedFicha(x, y);
    if(clickFig != null){
        clickFig.setResaltado(true);
        lastClickedFicha = clickFig;
    }
   drawFichas();
}

function onMouseMove(e){
    if(isMouseDown && lastClickedFicha!=null){
      const x = e.offsetX;
      const y = e.offsetY;
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
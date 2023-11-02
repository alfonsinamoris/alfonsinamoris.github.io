window.onload = function () {

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height

const tableroOcupado= [
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0]
];



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

let posInicialX;
let posInicialY;
function onMouseDown(e){
    isMouseDown = true;

    if(lastClickedFicha != null){
        lastClickedFicha.setResaltado(false);
        lastClickedFicha = null;
    }
    //captura pos en x e y donde hago click
    posInicialX = e.offsetX;
    posInicialY= e.offsetY;

    let clickFig = findClickedFicha(posInicialX, posInicialY);
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
    const x = e.offsetX;
    const y = e.offsetY;
    lastClickedFicha.setResaltado(true);

    if(lastClickedFicha !== null){
    if((x<810 && x>170) && (y>60 && y< 140) ){
        const columna = tablero.calculateColumn(x);
        //zona permitida para soltar ficha
        if(columna>-1 && columna<7){
            let fila = coincideColumna(columna);
            colocarFicha(fila,columna,posInicialX,posInicialY);

        }
        else{
            lastClickedFicha.setPosition(posInicialX,posInicialY)
        }
        console.log('soltar',columna);
        console.log(x);
        console.log(y);

    } else{
        lastClickedFicha.setPosition(posInicialX,posInicialY)
    }
    drawFichas();
}
}

function colocarFicha(fila,columna,posInicialX,posInicialY){
    if(fila === -1){
        lastClickedFicha.setPosition(posInicialX,posInicialY);

    }
    else{
        let x;
        if(columna===0){
            x=210;
        }
        if(columna===1){
            x=290;
        }
        if(columna===2){
            x=370;
        }
        if(columna===3){
            x=450;
        }
        if(columna===4){
            x=530;
        }
        if(columna===5){
            x=610;
        }

        let i = (fila*100);
        switch(fila){
            case 1:
                lastClickedFicha.setPosition(x,i);
                break;

            case 2:
                lastClickedFicha.setPosition(x,i-20);
                break;

            case 3:
                lastClickedFicha.setPosition(x,i-40);
                break;

            case 4:
                lastClickedFicha.setPosition(x,i-60);
                break;

            case 5:
                lastClickedFicha.setPosition(x,i-80);
                break;

            case 6:
                lastClickedFicha.setPosition(x,i-100);
                break;
        }
    }
    
}



function coincideColumna(columna){
    let filas = tableroOcupado.length;
    let i = 0;
    while (i < filas) {
        if(i === filas - 1 && tableroOcupado[i][columna] === 0) {//comprueba que si la ultima posicion es 0, se coloca ahi
            tableroOcupado[i][columna] = 1; // Colocar en la última posición si es 0
            return i+1;
        }
        else if(i=== 0 && tableroOcupado[i][columna]===1){// si la primera posicion esta ocupada, retorna negativo
            return -1;
        }
        else if (tableroOcupado[i][columna] === 0) {
            i++;
        }
        
        else {
            tableroOcupado[i-1][columna] = 1;
            return i;
        }
    }
    return -1;
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
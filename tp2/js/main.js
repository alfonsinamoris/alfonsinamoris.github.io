window.onload = function () {

let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let canvasWidth = canvas.width
let canvasHeight = canvas.height


const tableroOcupado= [
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
    [null,null,null,null,null,null,null],
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


function findClickedFicha(x, y) {
    for (let i = fichas.length - 1; i >= 0; i--) {
      const element = fichas[i];
      if (element.isPointInside(x, y)) {
        if (element instanceof fichaApple) {
          console.log('Es una ficha Apple');
          // Realiza acciones específicas para fichaApple
        } 
    else if (element instanceof fichaAndroid) {
          console.log('Es una ficha Android');
          // Realiza acciones específicas para fichaAndroid
        }
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


let jugadorApple = new Jugador(fichaApple);
let jugadorAndroid = new Jugador(fichaAndroid);
jugadorApple.setJugadorActual();
function cambiarTurno(){
    let turnoDe;
    if(jugadorApple.esTurno()){
        turnoDe = 'es turno de android';
        jugadorApple.desactivarJugador();
        jugadorAndroid.setJugadorActual();
    } else{
        turnoDe = 'es turno de apple';
        jugadorAndroid.desactivarJugador();
        jugadorApple.setJugadorActual();
    }
    console.log(turnoDe);
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
    if(jugadorApple.esTurno()){
        if(clickFig != null && clickFig instanceof fichaApple){
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }
    }    
    if(jugadorAndroid.esTurno()){
        if(clickFig != null && clickFig instanceof fichaAndroid){
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }
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

    if(lastClickedFicha !== null){
    if((x<810 && x>170) && (y>60 && y< 140) ){
        const columna = tablero.calculateColumn(x);
        if(columna>-1 && columna<7){
            let fila = coincideColumna(columna, lastClickedFicha);
            colocarFicha(fila,columna,posInicialX,posInicialY);
            const ganador = hayGanador(tableroOcupado, fila,columna,lastClickedFicha);
            console.log("¿Hay un ganador?", ganador);
            if(!ganador)
            cambiarTurno();
        }
        else{
            lastClickedFicha.setPosition(posInicialX,posInicialY)
        }

    } else{
        lastClickedFicha.setPosition(posInicialX,posInicialY)
    }
    lastClickedFicha.setResaltado(false);
    drawFichas();
    }

}


function hayGanador(tableroOcupado, fila, columna, lastClickedFicha) {
    if (lastClickedFicha === null) {
        // Si la última ficha es nula, no hay ganador.
        return false;
    }

    const fichaActual = lastClickedFicha;
    const direcciones = [
        [0, 1],     // Horizontal
        [1, 0],     // Vertical
        [1, 1],     // Diagonal derecha arriba a izquierda abajo
        [1, -1]     // Diagonal derecha abajo a izquierda arriba
    ];

    for (const direccion of direcciones) {
        const dx = direccion[0];
        const dy = direccion[1];
        let fichasEnDireccion = 1; // La ficha actual ya se cuenta.

        // Verificar hacia adelante
        let x = columna + dx;
        let y = fila + dy;
        while (x >= 0 && x < tableroOcupado[0].length &&
            y >= 0 && y < tableroOcupado.length &&
            tableroOcupado[y][x] === fichaActual) {
            fichasEnDireccion++;
            x += dx;
            y += dy;
        }

        // Verificar hacia atrás
        x = columna - dx;
        y = fila - dy;
        while (x >= 0 && x < tableroOcupado[0].length &&
            y >= 0 && y < tableroOcupado.length &&
            tableroOcupado[y][x] === fichaActual) {
            fichasEnDireccion++;
            x -= dx;
            y -= dy;
        }

        if (fichasEnDireccion >= 4) {
            // Si encontramos cuatro fichas del mismo tipo en una dirección, hay un ganador.
            return true;
        }
    }

    return false;
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
        if(columna===6){
            x=690;
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



function coincideColumna(columna, lastClickedFicha){
    let filas = tableroOcupado.length;
    let i = 0;
    while (i < filas) {
        if(i === filas - 1 && tableroOcupado[i][columna] === null) {//comprueba que si la ultima posicion es 0, se coloca ahi
            tableroOcupado[i][columna] = lastClickedFicha; // Colocar en la última posición si es 0
            return i+1;
        }
        else if(i=== 0 && tableroOcupado[i][columna]!==null){// si la primera posicion esta ocupada, retorna negativo
            return -1;
        }
        else if (tableroOcupado[i][columna] === null) {
            i++;
        }
        
        else {
            tableroOcupado[i-1][columna] = lastClickedFicha;
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
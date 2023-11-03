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

let turnojugador1 = true;

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
    if(turnojugador1){
        if(clickFig != null && clickFig instanceof fichaApple){
            clickFig.setResaltado(true);
            lastClickedFicha = clickFig;
        }
    }    
    if(!turnojugador1){
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
    lastClickedFicha.setResaltado(true);

    if(lastClickedFicha !== null){
    if((x<810 && x>170) && (y>60 && y< 140) ){
        const columna = tablero.calculateColumn(x);
        //zona permitida para soltar ficha
        if(columna>-1 && columna<7){
            let fila = coincideColumna(columna, lastClickedFicha);
            colocarFicha(fila,columna,posInicialX,posInicialY);
            const ganador = hayGanador(tableroOcupado, fila, columna);
            console.log("¿Hay un ganador?", ganador);
            turnojugador1 = !turnojugador1;



        }
        else{
            lastClickedFicha.setPosition(posInicialX,posInicialY)
        }

    } else{
        lastClickedFicha.setPosition(posInicialX,posInicialY)
    }
    drawFichas();
    }

}
    function hayGanador(tableroOcupado, fila, columna) {
        if (
            fila < 0 ||
            fila > tableroOcupado.length ||
            columna < 0 ||
            columna >= tableroOcupado[0].length
          ) {
            // Las coordenadas están fuera de los límites del tablero
            return false;
          }
        
      // error corta la funcion    const ficha = tableroOcupado[fila][columna];
        
          if (ficha === null) {
            // La posición en el tablero está vacía
            return false;
          }
              
        // Función para verificar una dirección específica (horizontal, vertical o diagonal)
        function verificarDireccion(dx, dy) {
          let cont = 1; // Contador de fichas iguales
          let x, y;
      
          // Verificar hacia la derecha (o arriba o abajo en caso de dirección vertical)
          x = columna + dx;
          y = fila + dy;
          while (x >= 0 && x < tableroOcupado[0].length && y >= 0 && y < tableroOcupado.length && tableroOcupado[y][x] === ficha) {
            cont++;
            x += dx;
            y += dy;
          }
      
          // Verificar hacia la izquierda (o arriba o abajo en caso de dirección vertical)
          x = columna - dx;
          y = fila - dy;
          while (x >= 0 && x < tableroOcupado[0].length && y >= 0 && y < tableroOcupado.length && tableroOcupado[y][x] === ficha) {
            cont++;
            x -= dx;
            y -= dy;
          }
      
          return cont >= 4;
        }
      
        // Verificar en todas las direcciones posibles
        return (
          verificarDireccion(1, 0) || // Horizontal (derecha e izquierda)
          verificarDireccion(0, 1) || // Vertical (arriba y abajo)
          verificarDireccion(1, 1) || // Diagonal derecha arriba e izquierda abajo
          verificarDireccion(1, -1)   // Diagonal derecha abajo e izquierda arriba
        );
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
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
    let name = "apple";
    let apple = new fichaApple(posX, posYApple, 30, color, context,name);
    fichas.push(apple);
    posYApple+=20;
}
let posYAndroid=100;
function addFichaAndroid() {
    let posX = 800;
    let color = 'green';
    let name = "android";
    let android = new fichaAndroid(posX, posYAndroid, 30, color, context,name);
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
    lastClickedFicha.setResaltado(true);

    if(lastClickedFicha !== null){
    if((x<810 && x>170) && (y>60 && y< 140) ){
        const columna = tablero.calculateColumn(x);
        //zona permitida para soltar ficha
        if(columna>-1 && columna<7){
            let fila = coincideColumna(columna, lastClickedFicha);
            colocarFicha(fila,columna,posInicialX,posInicialY);
            if(fila === 6){
                fila=5;
            }
            console.log(tableroOcupado);
            const resultado = verificarCuatroEnLinea(tableroOcupado, fila, columna);
            console.log(resultado); // Debería imprimir true
            
            cambiarTurno();



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
       // Función para buscar objetos iguales en una tableroOcupado
       function verificarCuatroEnLinea(tableroOcupado, fila, columna) {
        const filas = tableroOcupado.length;
        const columnas = tableroOcupado[0].length;
        if (fila < 0 || fila >= filas || columna < 0 || columna >= columnas) {
            return false;
          }
        const elemento = tableroOcupado[fila][columna];
      
        // Verificar hacia la derecha
        if (columna <= columnas - 4) {
          let contador = 0;
          let aux = columna;
          while(aux< columna+4) {
            let p1 = tableroOcupado[fila][aux];
            if (p1 && elemento) {
                if(p1.getName() === elemento.getName())
                    contador++;
                }
            
            aux++;
          }
          if (contador === 4) {
            return true;
          }
        }
      
        // Verificar hacia la izquierda
        if (columna >= 3) {
          let contador = 0;
          let aux = columna;
          while (aux > columna - 4) {
            let p1 = tableroOcupado[fila][aux];
            if (p1 && elemento) {
                if(p1.getName() === elemento.getName())
                    contador++;
                }
            aux--;
          }
          if (contador === 4) {
            return true;
          }
        }
      
        // Verificar hacia arriba
        if (fila >= 3) {
          let contador = 0;
          let aux = fila;
          while(aux > fila - 4) {
            let p1 = tableroOcupado[fila][aux];
            if (p1 && elemento) {
                if(p1.getName() === elemento.getName())
                    contador++;
                }
            aux--;
          }
          if (contador === 4) {
            return true;
          }
        }
      
        // Verificar hacia abajo
        if (fila <= filas - 4) {
          let contador = 0;
          let aux = fila;
          while(aux < fila + 4) {
            let p1 = tableroOcupado[fila][aux];
            if (p1 && elemento) {
                if(p1.getName() === elemento.getName())
                    contador++;
                }
            aux++;
          }
          if (contador === 4) {
            return true;
          }
        }
      
        // Verificar en diagonal hacia la derecha y abajo
        if (fila <= filas - 4 && columna <= columnas - 4) {
          let contador = 0;
          for (let i = 0; i < 4; i++) {
            let p1 = tableroOcupado[fila + i][columna + i];
                if(p1.getName() === elemento.getName()){
                    contador++;
                    }
          }
          if (contador === 4) {
            return true;
          }
        }
      
        // Verificar en diagonal hacia la derecha y arriba
        if (fila >= 3 && columna <= columnas - 4) {
          let contador = 0;
          for (let i = 0; i < 4; i++) {
            if (tableroOcupado[fila - i][columna + i] === elemento) {
              contador++;
            }
          }
          if (contador === 4) {
            return true;
          }
        }
      
        // Verificar en diagonal hacia la izquierda y abajo
        if (fila <= filas - 4 && columna >= 3) {
          let contador = 0;
          for (let i = 0; i < 4; i++) {
            if (tableroOcupado[fila + i][columna - i] === elemento) {
              contador++;
            }
          }
          if (contador === 4) {
            return true;
          }
        }
      
        // Verificar en diagonal hacia la izquierda y arriba
        if (fila >= 3 && columna >= 3) {
          let contador = 0;
          for (let i = 0; i < 4; i++) {
            if (tableroOcupado[fila - i][columna - i] === elemento) {
              contador++;
            }
          }
          if (contador === 4) {
            return true;
          }
        } 
      
        return false; // No se encontraron cuatro en línea en ninguna dirección
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
            return null;
        }
        else if (tableroOcupado[i][columna] === null) {
            i++;
        }
        
        else {
            tableroOcupado[i-1][columna] = lastClickedFicha;
            return i;
        }
    }
    return nullS;
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
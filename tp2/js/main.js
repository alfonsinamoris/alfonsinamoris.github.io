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


const tablero = new Tablero(80,6,7);

tablero.dibujarTablero(context, canvasWidth, canvasHeight);


let gameStarted = false;
let gameTimer=null;
let startButton = document.getElementById('startButton');
startButton.addEventListener('click', iniciarJuego);

//inicia juego cuando toco boton de iniciar juego
function iniciarJuego() {
    gameStarted = true;
    startGameTimer(180); // 180 segundos = 3 minutos
    document.querySelector('#buttonContainer').style.display = 'none';
    document.getElementById('endButton').style.display = 'block';
}

document.getElementById('endButton').addEventListener('click', function() {
    endGame();
});

//empieza a correr el tiempo
function startGameTimer(seconds) {
    let timerDisplay = document.getElementById('timer'); // Selecciona el elemento timerDisplay
    timerDisplay.style.display = 'block'; // Muestra el contador de tiempo
    
    let startButton = document.getElementById('startButton');
    let endButton = document.getElementById('endButton');
    
    timerDisplay.textContent = formatTime(seconds);
    
    gameTimer = setInterval(function() {
        seconds--;
        timerDisplay.textContent = formatTime(seconds);
        
        if (seconds <= 0) {
            endGame(); // Se acabó el tiempo
        }
    }, 1000);
    
    startButton.style.display = 'none';
    endButton.style.display = 'block';
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

//finaliza el juego tocando el boton de finalizar o cuando se acaba el tiempo
function endGame() {

    gameStarted = false;
    clearInterval(gameTimer);
    gameTimer = null;
    mostrarGanador();
    
    let endButton = document.getElementById('endButton');
    endButton.style.display = 'none';
    reiniciarJuego();

}


//agrega ficha al arreglo
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
    if(gameStarted===true){

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
        //zona permitida para soltar ficha
        if(columna>-1 && columna<7){
            let fila = coincideColumna(columna, lastClickedFicha);
            colocarFicha(fila,columna,posInicialX,posInicialY);
            
            console.log(tableroOcupado);
            const resultado = verificarCuatroEnLinea(tableroOcupado, fila, columna);
            drawFichas();
            if(resultado === true){
              mostrarGanador(lastClickedFicha);
            }
            else
              cambiarTurno();

        }
        else{
            lastClickedFicha.setPosition(posInicialX,posInicialY);
            drawFichas();
        }

      } 
      else{
        lastClickedFicha.setPosition(posInicialX,posInicialY)
        drawFichas();
      }
         lastClickedFicha.setResaltado(false); 
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
      if(p1 !== null){
        if (p1 && elemento) {
            if(p1.getName() === elemento.getName())
                contador++;
            }
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

  // Verificar hacia abajo
  if (fila <= 3) {
    let contador = 0;
    let aux = fila;
    while(aux < fila + 4 && aux<filas) {
      let p1 = tableroOcupado[aux][columna];
      if(p1 != null){
        if (p1 && elemento) {
            if(p1.getName() === elemento.getName())
                contador++;
            }
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
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
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
      let p1 = tableroOcupado[fila - i][columna + i];
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
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
      let p1 = tableroOcupado[fila + i][columna - i];
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
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
      let p1 = tableroOcupado[fila - i][columna - i];
      if(p1 != null){
          if(p1.getName() === elemento.getName()){
              contador++;
              }
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
            case 0:
                lastClickedFicha.setPosition(x,i+100);
                break;

            case 1:
                lastClickedFicha.setPosition(x,i+80);
                break;

            case 2:
                lastClickedFicha.setPosition(x,i+60);
                break;

            case 3:
                lastClickedFicha.setPosition(x,i+40);
                break;

            case 4:
                lastClickedFicha.setPosition(x,i+20);
                break;

            case 5:
                lastClickedFicha.setPosition(x,i);
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
            return i;
        }
        else if(i=== 0 && tableroOcupado[i][columna]!==null){// si la primera posicion esta ocupada, retorna negativo
            return null;
        }
        else if (tableroOcupado[i][columna] === null) {
            i++;
        }
        
        else {
            tableroOcupado[i-1][columna] = lastClickedFicha;
            return i-1;
        }
    }
    return null;
}
function mostrarGanador(lastClickedFicha){
  if(lastClickedFicha instanceof fichaAndroid){
    let text = "El ganador es Android";
    context.font="50px Arial";
    context.strokeStyle = "black"; // Color del borde
    context.lineWidth = 2; // Ancho del borde
    var x = 300;
    var y = 300;
    context.fillText(text, x, y);
  } else if(gameStarted === false){
    let text = "empate, se acabo el tiempo"
    context.font="50px Arial";
    context.fillStyle="red"
    context.strokeStyle = "black"; // Color del borde
    context.lineWidth = 2; // Ancho del borde

    var x = 300;
    var y = 300;
    context.fillText(text, x, y);
  }
  else {
    let text = "El ganador es Apple";
    context.font="50px Arial";
    context.fillStyle="red"
    context.strokeStyle = "black"; // Color del borde
    context.lineWidth = 2; // Ancho del borde

    var x = 300;
    var y = 300;
    context.fillText(text, x, y);
  }

  setTimeout(reiniciarJuego, 2000);

}
function reiniciarJuego() {
  // Restablece el arreglo tableroOcupado a su estado inicial
  for (let fila = 0; fila < tableroOcupado.length; fila++) {
      for (let columna = 0; columna < tableroOcupado[fila].length; columna++) {
          tableroOcupado[fila][columna] = null;
      }
  }

  // Elimina todas las fichas del arreglo fichas
  fichas = [];

  // Vuelve a dibujar el tablero y agregar fichas iniciales
  tablero.dibujarTablero(context, canvasWidth, canvasHeight);
  posYAndroid= 100;
  posYApple = 100;
  addFichas();
  startButton.style.display='block';
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
// nav sticky
window.onscroll = function() {myFunction()};
var navbar = document.querySelector(".header");
var sticky = navbar.offsetTop;
var logo = document.getElementById("logoNav");

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    //cuando se scrollea se muestra el logo en el header
    logo.style.display="grid";
  } else {
    navbar.classList.remove("sticky");
    //si no se scrolleo el logo no se muestra
    logo.style.display="none";
  }
}

//parallax
let logoPag1 = document.getElementById('logoPag1');
let capa1 = document.getElementById('capa1');
//let capa2 = document.getElementById('capa2');
//let capa3 = document.getElementById('capa3');
//let capa4 = document.getElementById('capa4');
let capa5 = document.getElementById('capa5');
let capa6 = document.getElementById('capa6');
let capa7 = document.getElementById('capa7');
let capa8 = document.getElementById('capa8');
let capa9 = document.getElementById('capa9');
let duende = document.getElementById('duende');
let imgSticky1 = document.getElementById('IMG1');
let logoNav = document.getElementById('logoNav');
let cuadro1 = document.querySelector('.cuadroFade1');
let cuadro2 = document.querySelector('.cuadroFade2');
let cuadro3 = document.querySelector('.cuadroFade3');






//agarra la posicion inicial de las capas para moverlas a partir de esa
let intialBottomPosition7 = parseFloat(getComputedStyle(capa7).bottom);
let intialRightPosition7 = parseFloat(getComputedStyle(capa7).right);

let intialBottomPosition9 = parseFloat(getComputedStyle(capa9).bottom);
let intialRightPosition9 = parseFloat(getComputedStyle(capa9).right);

let intialLeftPosition5 = parseFloat(getComputedStyle(capa5).left);
let intialBottomPosition6 = parseFloat(getComputedStyle(capa6).bottom);
let intialBottomPosition8 = parseFloat(getComputedStyle(capa8).bottom);


window.addEventListener('scroll',()=>{
  let value = window.scrollY;

  
  console.log(value);
  // mostrar logo en header en caso de que haya pasado por el logo principal
        if(value>181){
            logoNav.style.display = 'block';

        }
        else{
            logoNav.style.display = 'none';
        }
    //le agrega o resta px o porcentajes del inicial a medida q se scrollea y le suma el scroll en y
      capa7.style.bottom = intialBottomPosition7 + value * 0.5 + 'px';
      capa7.style.right = intialRightPosition7 + value * -0.5 + 'px';

      capa9.style.bottom = intialBottomPosition9 + value * 0.5 + 'px';
      capa9.style.right = intialRightPosition9 + value * -0.5 + 'px';

      capa5.style.left = intialLeftPosition5 + value * -0.4 +'px';
      logoPag1.style.top = value *-0.5 +'px';
      capa6.style.bottom =intialBottomPosition6 + value * 0.5+'px';
      capa8.style.bottom = intialBottomPosition8 + value *0.5 + 'px';
      // Ajusta la posición de la imagen en respuesta al desplazamiento
      duende.style.top = 0 - value * 0.2 + 'px';

        // fade-in cards
        if(value>670){
          if (cuadro1 && cuadro2 && cuadro3) {
            setTimeout(function () {
                cuadro1.style.opacity = 1;
            }, 1000); 

            setTimeout(function () {
                cuadro2.style.opacity = 1;
            }, 1300); 

            setTimeout(function () {
                cuadro3.style.opacity = 1;
            }, 1500);
        
        }
      }
        else{
          cuadro1.style.opacity = 0;
          cuadro2.style.opacity = 0;
          cuadro3.style.opacity = 0;

      }
      


    // Imagenes a la par del texto
      if(value>2069 && value<2400){
        imgSticky1.classList.add('stickyIMG');
      }
      else{
        imgSticky1.classList.remove('stickyIMG');

      }
      // Verificar si el usuario ha llegado al final de la página
      //duende.style.top = value * -0.5 +'px';
});

//4250 al 4585

//parallax hover


  document.addEventListener("mousemove", parallax);
  const elem = document.querySelector("#aranaNegro");
  function parallax(e){
    let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth1 = `${50 - (_mouseX - _w) * 1}px ${50 - (_mouseY - _h) * 1}px`;
        let _depth2 = `${50 - (_mouseX - _w) * 1}px ${50 - (_mouseY - _h) * 1}px`;
        let _depth3 = `${50 - (_mouseX - _w) * 1}px ${50 - (_mouseY - _h) * 1}px`;
        let x = `${_depth3}, ${_depth2}, ${_depth1}`;
        console.log(x);
        elem.style.backgroundPosition = x;
  }

//seccion ghost spider
document.addEventListener('DOMContentLoaded', function () {
  const tarjeta1 = document.querySelector('.tarjeta1');
  const tarjeta2 = document.querySelector('.tarjeta2');
  const tarjeta3 = document.querySelector('.tarjeta3');

  // Obtenemos las posiciones iniciales
  const tarjeta1PosInicial = tarjeta1.getBoundingClientRect().top + window.scrollY;
  const tarjeta2PosInicial = tarjeta2.getBoundingClientRect().top + window.scrollY;
  const tarjeta3PosInicial = tarjeta3.getBoundingClientRect().top + window.scrollY;

  window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;

      // Calculamos el desplazamiento desde la posición inicial
      const desplazamiento1 = tarjeta1PosInicial - scrollPosition;
      const desplazamiento2 = tarjeta2PosInicial - scrollPosition;
      const desplazamiento3 = tarjeta3PosInicial - scrollPosition;

      // Aplicamos el desplazamiento a las tarjetas
      tarjeta1.style.transform = `translateY(${desplazamiento1 * 0.1}px)`;
      tarjeta2.style.transform = `translateY(${desplazamiento2 * 0.1}px)`;
      tarjeta3.style.transform = `translateY(${desplazamiento3 * 0.1}px)`;
  });

  // Añadimos el efecto de rotación al hacer hover
  const tarjetas = document.querySelectorAll('.tarjeta1, .tarjeta2, .tarjeta3');
  tarjetas.forEach(tarjeta => {
      tarjeta.addEventListener('mouseover', function () {
          tarjeta.style.transform = 'perspective(1000px) rotateX(40deg)';
      });

      tarjeta.addEventListener('mouseout', function () {
          tarjeta.style.transform = '';
      });
  });
})


document.addEventListener("DOMContentLoaded", function () {
  // Simula la carga de la página
  let cargaActual = 0;
  const porcentajeCarga = document.getElementById("porcentaje-carga");
  const logoSpinner = document.querySelector(".logoSpinner");
  const hombreAraña = document.querySelector(".spiderCarga");

  const simularCarga = setInterval(function () {
      
      cargaActual += 1;
     porcentajeCarga.innerText = cargaActual + "%";

      // Calcula la caida gradualmente

      const translateYValue = cargaActual / 100 * logoSpinner.offsetHeight;


      // aplica el movimiento al logo 

      logoSpinner.style.transform = 'translateY(' + translateYValue + 'px)';
      hombreAraña.style.transform = 'translateY(' + translateYValue + 'px)';


      if (cargaActual < 100) {
          document.querySelectorAll(".header, .parallax1, .contenedorVioleta, .recctBlanco, .contenedorGhostSpider, .paralax2, .masAmigos,  .tresSpiders, .ultimo, .footerClass, .contenedorVioleta, .ghostSpider, .buttonComprar, .header ").forEach(function(element) {
              element.style.display = "none";
          });
      } else {
          clearInterval(simularCarga);
          // Oculta el spinner y el porcentaje de carga una vez que la carga esté completa
          document.querySelector(".spinner-container").style.display = "none";
          document.querySelector(".header").style.display = "flex";
          document.querySelectorAll(".parallax1, .contenedorVioleta, .recctBlanco, .contenedorGhostSpider, .paralax2, .masAmigos,  .tresSpiders, .ultimo, .footerClass, .contenedorVioleta, .ghostSpider, .buttonComprar").forEach(function(element) {
            element.style.display = "block";
        });
      }
  }, 50);
});  


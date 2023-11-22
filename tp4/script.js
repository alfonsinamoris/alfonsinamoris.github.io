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
let cuadros = document.querySelectorAll('.cuadroFade');





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
        if(value>635){
          cuadros.forEach(function (cuadro) {
            cuadro.style.opacity = 1;
        });
        
        }
        else{
          cuadros.forEach(function (cuadro) {
            cuadro.style.opacity = 0;
        });
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
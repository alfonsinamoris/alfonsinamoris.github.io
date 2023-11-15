// nav sticky
/*window.onscroll = function() {myFunction()};
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
let capa2 = document.getElementById('capa2');
let capa3 = document.getElementById('capa3');
let capa4 = document.getElementById('capa4');
let capa5 = document.getElementById('capa5');
let capa6 = document.getElementById('capa6');
let capa7 = document.getElementById('capa7');
let capa8 = document.getElementById('capa8');
let capa9 = document.getElementById('capa9');
let duende = document.getElementById('duende');

window.addEventListener('scroll',()=>{
  let value = window.scrollY;
  //le agrega o resta px o porcentajes del inicial a medida q se scrollea
  capa7.style.bottom = value * 1.5 + 'px';
  capa7.style.right = value * -0.4 + 'px';
  capa3.style.bottom = value * -0.1 +'%';
  capa2.style.bottom = value * -0.1 +'%';
  capa4.style.bottom = value * -1 +'px';
  capa5.style.left = value * -0.4 +'px';
  logoPag1.style.top = value *-1 +'px';
  capa6.style.bottom = value * 1+'px';


  //duende.style.top = value * -0.5 +'px';
});*/
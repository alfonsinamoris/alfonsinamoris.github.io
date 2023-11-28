let logoPag1 = document.getElementById('logoPag1');
let capa1 = document.getElementById('capa1');
let capa5 = document.getElementById('capa5');
let capa6 = document.getElementById('capa6');
let capa7 = document.getElementById('capa7');
let capa8 = document.getElementById('capa8');
let capa9 = document.getElementById('capa9');


let intialBottomPosition7 = parseFloat(getComputedStyle(capa7).bottom);
let intialRightPosition7 = parseFloat(getComputedStyle(capa7).right);
let intialBottomPosition9 = parseFloat(getComputedStyle(capa9).bottom);
let intialRightPosition9 = parseFloat(getComputedStyle(capa9).right);
let intialLeftPosition5 = parseFloat(getComputedStyle(capa5).left);
let intialBottomPosition6 = parseFloat(getComputedStyle(capa6).bottom);
let intialBottomPosition8 = parseFloat(getComputedStyle(capa8).bottom);

window.addEventListener('scroll',()=>{
    let value = window.scrollY;
      capa7.style.bottom = intialBottomPosition7 + value * 0.5 + 'px';
      capa9.style.bottom = intialBottomPosition9 + value * 0.5 + 'px';
      capa5.style.left = intialLeftPosition5 + value * -0.4 +'px';
      logoPag1.style.top = value *-0.5 +'px';
      capa6.style.bottom =intialBottomPosition6 + value * 0.5+'px';
      capa8.style.bottom = intialBottomPosition8 + value *0.5 + 'px';
});
let cuadro1 = document.querySelector('.cuadroFade1');
let cuadro2 = document.querySelector('.cuadroFade2');
let cuadro3 = document.querySelector('.cuadroFade3');

window.addEventListener('scroll',()=>{
    let value = window.scrollY;
  
  
  
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
    });
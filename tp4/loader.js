

document.addEventListener("DOMContentLoaded", function () {
  // Simula la carga de la página
  let cargaActual = 0;
  const spinner = document.querySelector(".spinner"); 
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
          document.querySelectorAll(".header, .parallax1, .contenedorVioleta, .recctBlanco, .contenedorGhostSpider, .paralax2, .masAmigos,  .tresSpiders, .ultimo, .footerClass, .contenedorVioleta, .ghostSpider, .buttonComprar, .header, .rectanguloBlanco1, .rectanguloBlanco2, .rectanguloBlanco3, .comprar").forEach(function(element) {
              element.style.display = "none";
          });
      } else {
          clearInterval(simularCarga);
          // Oculta el spinner y el porcentaje de carga una vez que la carga esté completa
          document.querySelector(".spinner-container").style.display = "none";
          document.querySelector(".header").style.display = "flex";
          document.querySelectorAll(".parallax1, .contenedorVioleta, .recctBlanco, .contenedorGhostSpider, .paralax2, .masAmigos,  .tresSpiders, .ultimo, .footerClass, .contenedorVioleta, .ghostSpider, .buttonComprar, .rectanguloBlanco1, .rectanguloBlanco2, .rectanguloBlanco3, .comprar").forEach(function(element) {
            element.style.display = "block";
        });
      }
  }, 50);
});  


document.addEventListener("DOMContentLoaded", function() {
    // Obtén todas las imágenes y textos
    const imgFija = document.querySelector('.ImgMasAmigos1');
    const textos = document.querySelectorAll('.contenedorTxtMA');
  
    // Agrega un controlador de eventos al scroll
    window.addEventListener('scroll', function() {
      // Obtén la posición actual del scroll
      const scrollPosition = window.scrollY;
       // console.log(scrollPosition);
        if(scrollPosition<2260){
            imgFija.classList.add('imgFija');
        } else {
          imgFija.classList.remove('imgFija');
        }
    
    });
  });
  
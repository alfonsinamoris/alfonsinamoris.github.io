document.addEventListener("scroll", () => {
  let posScroll = window.scrollY;

  let imagen = document.getElementById('masAmigos-img');


  //Agarro urls de las imagenes
  let img1 = "images/image 21.png";
  let img2 = "images/image 9.png";
  let img3 = "images/image 10.png";
  let img4 = "images/image 6.png";

  //Agarro textos
  let txt1 = document.getElementById('masAmigos-txt1');
  let txt2 = document.getElementById('masAmigos-txt2');
  let txt3 = document.getElementById('masAmigos-txt3');
  let txt4 = document.getElementById('masAmigos-txt4');


  //Segun la posicion del scroll voy cambiando la url de la imagen, que queda
  //sticky a la izquierda de la pantalla, y ademas le voy poniendo o sacando
  //opacidad a los textos que se corresponden con la imagen.
  if(posScroll > 1800 && posScroll < 4250) {
      txt2.style.opacity = 0;
      txt3.style.opacity = 0;
      txt4.style.opacity = 0;

      imagen.src = img1;
      imagen.style.opacity = 1;
      txt1.style.opacity = 1;
  } else if(posScroll > 4250 && posScroll < 4690) {
      txt1.style.opacity = 0;
      txt3.style.opacity = 0;
      txt4.style.opacity = 0;

      imagen.src = img2;
      txt2.style.opacity = 1;
  } else if(posScroll > 4690 && posScroll < 5260) {
      txt2.style.opacity = 0;
      txt4.style.opacity = 0;
      txt1.style.opacity = 0;

      imagen.src = img3;
      txt3.style.opacity = 1;
  } else if(posScroll > 5260) {
      txt3.style.opacity = 0;
      txt1.style.opacity = 0;
      txt2.style.opacity = 0;

      imagen.src = img4;
      txt4.style.opacity = 1;
  }

  //Aca verifico que cuando este dentro del rango de la seccion la imagen sea sticky
  //si se pasa, que sea absoluta asi no sigue bajando al resto de la pagina.
  if(posScroll > 3300 && posScroll < 5470) {
      imagen.style.position = "sticky";
      imagen.style.top = "150px";
  } else if(posScroll > 5470) {
      imagen.style.position = "absolute";
      imagen.style.top = "1342px";
      imagen.style.opacity = 1;
  }
})
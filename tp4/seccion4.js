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
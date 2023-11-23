window.addEventListener('scroll', function () {
    let value = window.scrollY;
    let navbar = document.querySelector(".header");
    let sticky = navbar.offsetTop;
    let logo = document.getElementById("logoNav");

    // Cuando se scrollea se muestra el logo en el header
    if (value >= sticky) {
        navbar.classList.add("sticky");
        logo.style.display = "grid";
    } else {
        navbar.classList.remove("sticky");
        // Si no se scrolleo el logo no se muestra
        logo.style.display = "none";
    }

    // Mostrar logo en header en caso de que haya pasado por el logo principal
    if (value > 181) {
        logo.style.display = 'block';
    } else {
        logo.style.display = 'none';
    }
});
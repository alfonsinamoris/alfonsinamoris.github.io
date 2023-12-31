let menu = document.querySelector(".navigation");
let desplegado = false;

function toggleMenu() {
    const hamburguesa = document.querySelector('.hamburguesa');

    if (!desplegado) {
        // Si el menú no está abierto, ábrelo
        menu.style.display = "flex";
        var listItems = document.querySelectorAll('.navigation ul li');
        function showItems(index) {
            if (index < listItems.length) {
                listItems[index].classList.add('visible');
                setTimeout(function () {
                    showItems(index + 1);
                }, 300);
            }
        }
        
        showItems(0);
        desplegado = true;

        // Cambiar el ícono a "X"
        hamburguesa.classList.add('abierto');
    } else {
        // Si el menú está abierto, ciérralo
        menu.style.display = "none";

        // También puedes agregar lógica para ocultar los elementos con un efecto si lo deseas
        var listItems = document.querySelectorAll('.navigation ul li');
        listItems.forEach(item => {
            item.classList.remove('visible');
        });

        desplegado = false;

        // Cambiar el ícono a la hamburguesa
        hamburguesa.classList.remove('abierto');
    }
}

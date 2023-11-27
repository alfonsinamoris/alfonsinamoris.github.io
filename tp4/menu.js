let menu = document.querySelector(".navigation");
let abierto = false;
function toggleMenu(){
    if(abierto===false){
    menu.style.display = "flex";
    var listItems = document.querySelectorAll('.navigation ul li');

    function showItems(index) {
        if (index < listItems.length) {
            listItems[index].classList.add('visible');
            setTimeout(function() {
                showItems(index + 1);
            }, 300);
        }
    }

    showItems(0);
    abierto=true;
    }
    else {
       
    }
}
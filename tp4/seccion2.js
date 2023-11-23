let duende = document.getElementById('duende');

window.addEventListener('scroll',()=>{
    let value = window.scrollY;
    duende.style.top = 0 - value * 0.2 + 'px';
});
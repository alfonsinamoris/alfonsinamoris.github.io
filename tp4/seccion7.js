document.addEventListener('DOMContentLoaded', function () {
document.getElementById("spiderRosa").addEventListener("mouseover", spiderRosa);
document.getElementById("spiderRosa").addEventListener("mouseout", spiderRosaReset);
rosa = document.getElementById("spiderRosa");

document.getElementById("spiderNegro").addEventListener("mouseover", spiderNegro);
document.getElementById("spiderNegro").addEventListener("mouseout", spiderNegroReset);
negro = document.getElementById("spiderNegro");



document.getElementById("spiderRojo").addEventListener("mouseover", spiderRojo);
document.getElementById("spiderRojo").addEventListener("mouseout", spiderRojoReset);
rojo = document.getElementById("spiderRojo");


function spiderRosa(){
    rect = document.querySelector(".rectSpiderRosa");
    console.log("el mouse esta en el rosa");
    rect.style.display = "flex";
    rojo.style.filter = "blur(5px)";
    negro.style.filter = "blur(5px)";



}
function spiderRosaReset(){
    rect = document.querySelector(".rectSpiderRosa");
    rect.style.display = "none";
    rojo.style.filter = "none";
    negro.style.filter = "none";



}
function spiderRojo(){
    rect = document.querySelector(".rectSpiderRojo");
    console.log("el mouse esta en el rojo");
    rect.style.display = "flex";
    rosa.style.filter = "blur(5px)";
    negro.style.filter = "blur(5px)";


}
function spiderRojoReset(){
    rect = document.querySelector(".rectSpiderRojo");
    rect.style.display = "none";
    rosa.style.filter = "none";
    negro.style.filter = "none";


}
function spiderNegro(){
    rect = document.querySelector(".rectSpiderNegro");
    console.log("el mouse esta en el rojo");
    rect.style.display = "flex";
    rojo.style.filter = "blur(5px)";
    rosa.style.filter = "blur(5px)";


}
function spiderNegroReset(){
    rect = document.querySelector(".rectSpiderNegro");
    rect.style.display = "none";
    rojo.style.filter = "none";
    rosa.style.filter = "none";


}
});
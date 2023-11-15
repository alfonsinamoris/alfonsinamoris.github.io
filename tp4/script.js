// When the user scrolls the page, execute myFunction 
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.querySelector(".header");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

var logo = document.getElementById("logoNav");

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
    logo.style.display="none";
  } else {
    navbar.classList.remove("sticky");
    logo.style.display="grid";
  }
}
document.addEventListener("DOMContentLoaded", function () {
  const scrollContainer = document.getElementById("scrollContainer");
  const sections = document.querySelectorAll(".txtMasAmigos, .contenedorImagenes img");

  window.addEventListener("scroll", function () {
    const scrollOffset = scrollContainer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    sections.forEach((section) => {
      const sectionOffset = section.getBoundingClientRect().top;

      // Ajustar el valor de acuerdo al diseño y posición de tus elementos
      const triggerOffset = windowHeight * 0.3;

      if (sectionOffset < triggerOffset) {
        section.style.opacity = 1;
      } else {
        section.style.opacity = 0;
      }
    });
  });
});
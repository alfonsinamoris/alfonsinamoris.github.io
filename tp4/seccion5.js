//parallax hover
document.addEventListener("mousemove", parallax);
const elem = document.querySelector("#aranaNegro");
function parallax(e){
  let _w = window.innerWidth/2;
      let _h = window.innerHeight/2;
      let _mouseX = e.clientX;
      let _mouseY = e.clientY;
      let _depth1 = `${50 - (_mouseX - _w) * 1}px ${50 - (_mouseY - _h) * 1}px`;
      let _depth2 = `${50 - (_mouseX - _w) * 1}px ${50 - (_mouseY - _h) * 1}px`;
      let _depth3 = `${50 - (_mouseX - _w) * 1}px ${50 - (_mouseY - _h) * 1}px`;
      let x = `${_depth3}, ${_depth2}, ${_depth1}`;
      //console.log(x);
      elem.style.backgroundPosition = x;
}
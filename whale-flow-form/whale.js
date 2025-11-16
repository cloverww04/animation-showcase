let mouseX = 0;
let mouseY = 0;


const coordinates = document.querySelector('#coordinates strong');

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // console.log(`x: ${mouseX} y: ${mouseY}`);
  if (coordinates) {
    coordinates.innerText = `x: ${mouseX} y: ${mouseY}`;
  }

});
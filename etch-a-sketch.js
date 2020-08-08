const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const DRAWING_STEP = 15;
let drawingColor = 'rgba(106, 146, 242, 1)';

const buttonUp = document.querySelector('.buttonUp');
const buttonDown = document.querySelector('.buttonDown');
const buttonLeft = document.querySelector('.buttonLeft');
const buttonRight = document.querySelector('.buttonRight');
const resetButton = document.querySelector('.reset');
const toggleControllerButton = document.querySelector(
  '.toggleControllerButton'
);
const controllerWrapper = document.querySelector('.controllerWrapper');

const colorButtons = document.querySelectorAll('.colorButton');
// Setting the starting point of the pen
const { width, height } = canvas;
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineCap = 'square';
ctx.lineJoin = 'bevel';
ctx.lineWidth = 15;

function init() {
  ctx.strokeStyle = drawingColor;
  ctx.beginPath();
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKeyPress({ key }) {
  const keypressed = key;
  if (!keypressed.includes('Arrow')) return;
  switch (keypressed) {
    case 'ArrowUp':
      buttonUp.classList.remove('active');
      y -= DRAWING_STEP;
      break;
    case 'ArrowDown':
      buttonDown.classList.remove('active');
      y += DRAWING_STEP;
      break;
    case 'ArrowLeft':
      buttonLeft.classList.remove('active');
      x -= DRAWING_STEP;
      break;
    case 'ArrowRight':
      buttonRight.classList.remove('active');
      x += DRAWING_STEP;
      break;
    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKeyPressDown({ key }) {
  const keypressed = key;
  if (!keypressed.includes('Arrow')) return;
  switch (keypressed) {
    case 'ArrowUp':
      buttonUp.classList.add('active');
      break;
    case 'ArrowDown':
      buttonDown.classList.add('active');
      break;
    case 'ArrowLeft':
      buttonLeft.classList.add('active');
      break;
    case 'ArrowRight':
      buttonRight.classList.add('active');
      break;
    default:
      break;
  }
}

function clearCanvas() {
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, width, height);
  init();
}

function toggleController() {
  controllerWrapper.classList.toggle('controllerShow');
}

function selectColor(event) {
  console.log(event.currentTarget.classList[1]);
  switch (event.currentTarget.classList[1]) {
    case 'red':
      drawingColor = '#e93544';
      break;
    case 'blue':
      drawingColor = '#6A92F2';
      break;
    case 'green':
      drawingColor = '#5be272';
      break;
    case 'yellow':
      drawingColor = '#fffb04';
      break;
    case 'orange':
      drawingColor = '#ffc400';
      break;
    case 'gray':
      drawingColor = '#9c9c9c';
      break;
    case 'white':
      drawingColor = '#ffffff';
      break;
    case 'black':
      drawingColor = '#000000';
      break;
    default:
      break;
  }
  init();
}

init();
window.addEventListener('keyup', handleKeyPress);
window.addEventListener('keydown', handleKeyPressDown);
resetButton.addEventListener('click', clearCanvas);
toggleControllerButton.addEventListener('click', toggleController);
colorButtons.forEach(button => button.addEventListener('click', selectColor));
canvas.addEventListener('blur', canvas.focus());

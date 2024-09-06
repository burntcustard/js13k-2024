import { GameLoop, fps } from './modified-kontra/game-loop';
import { grid, cells, cellCssSize } from './grid';
import initMouse from './mouse';
import { camera } from './camera';
import { RoadShopTile } from './tiles/road-shop';
import { settings } from "./settings";
import { createElement } from './create-element';

let updateCount = 0;
let renderCount = 0;

const gameObjects = [];

const toggleAntialiasing = () => {
  settings.antialiasing = !settings.antialiasing;
  console.log('Toggling anti-aliasing to', settings.antialiasing);
  document.body.classList.toggle('antialias', settings.antialiasing);
}
document.body.classList.toggle('antialias', settings.antialiasing);

const toggleFaceOverlap = () => {
  settings.faceOverlap = !settings.faceOverlap;
  console.log('Toggling faceOverlap to', settings.faceOverlap);
  settings.faceOverlapPx = settings.faceOverlap ? 1 : 0;
  gameObjects.forEach(obj => obj.render());
}
settings.faceOverlapPx = settings.faceOverlap ? 1 : 0;

const loop = GameLoop({
  update() {
    updateCount++;

    // if (updateCount === 1) console.log(updateCount);

    if (updateCount >= fps) updateCount = 0;
  },

  render() {
    renderCount++;

    if (renderCount >= fps) renderCount = 0;
  },
});

loop.start();

const testTile = new RoadShopTile({
  x: 0,
  y: 0,
  floating: 1,
});

testTile.draw();

gameObjects.push(testTile);

const floatyElement = createElement();
floatyElement.style.position = 'absolute';
floatyElement.style.transition = 'all .5s';
floatyElement.style.pointerEvents = 'none';
testTile.addTo(floatyElement);
grid.appendChild(floatyElement);

initMouse();

const x = cellCssSize * cells[Math.floor(cells.length / 2)].coords.x;
const y = cellCssSize * cells[Math.floor(cells.length / 2)].coords.y;

floatyElement.style.left = `${x}vmin`;
floatyElement.style.top = `${y}vmin`;

cells.forEach(cell => {
  // cell.addEventListener('pointerover', () => {
  //   const x = cellCssSize * cell.coords.x;
  //   const y = cellCssSize * cell.coords.y;

  //   floatyElement.style.left = `${x}vmin`;
  //   floatyElement.style.top = `${y}vmin`;
  // });

  cell.addEventListener('pointerdown', () => {
    // floatyElement.style.transform = 'translateZ(9vmin)';
    // floatyElement.style.transform = 'translateZ(0)';
    // testTile.place();
  });

  cell.addEventListener('pointerup', () => {
    // floatyElement.style.transform = 'translateZ(10vmin)';
    // testTile.lift();
  });
});

document.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'ArrowRight') camera.rotateRight();
  if (event.key === 'ArrowLeft') camera.rotateLeft();
  if (event.key === 'a') toggleAntialiasing();
  if (event.key === 'f') toggleFaceOverlap();
});

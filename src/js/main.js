import { GameLoop, fps } from './modified-kontra/game-loop';
import { grid } from './grid';
import initMouse from './mouse';
import { camera } from './camera';
import { RoadShopTile } from './tiles/road-shop';
import { settings } from "./settings";

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

    if (updateCount === 1) console.log(updateCount);

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
});

testTile.draw();

testTile.addTo(grid.children[12]);

gameObjects.push(testTile);

initMouse();

document.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'ArrowRight') camera.rotateRight();
  if (event.key === 'ArrowLeft') camera.rotateLeft();
  if (event.key === 'F1') toggleAntialiasing();
  if (event.key === 'F2') toggleFaceOverlap();
});

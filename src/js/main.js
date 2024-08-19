import { GameLoop, fps } from './modified-kontra/game-loop';
import { grid } from './grid';
import initMouse from './mouse';
import { camera } from './camera';
import { RoadShopTile } from './tiles/road-shop';

let updateCount = 0;
let renderCount = 0;

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

testTile.addTo(grid.children[12]);

initMouse();

document.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'ArrowRight') camera.rotateRight();
  if (event.key === 'ArrowLeft') camera.rotateLeft();
});

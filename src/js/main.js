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

new RoadShopTile({
  x: 0,
  y: 0,
});

initMouse();

document.addEventListener('keydown', (event) => {
  console.log(event.key);
  if (event.key === 'ArrowRight') camera.rotateRight();
  if (event.key === 'ArrowLeft') camera.rotateLeft();
  // if (event.key === 'o') playWarnNote(colors.ox);
  // if (event.key === 'g') playWarnNote(colors.goat);
  // if (event.key === 'f') playWarnNote(colors.fish);
  // if (event.key === 'p') playPathPlacementNote();
  // if (event.key === 'r') playPathDeleteNote();
  // if (event.key === 't') playTreeDeleteNote();
  // if (event.key === 'y') playYurtSpawnNote();
  // if (event.key === 'n') playOutOfPathsNote(); // 'n'o paths
});

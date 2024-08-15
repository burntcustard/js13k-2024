import { GameLoop, fps } from './modified-kontra/game-loop';

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

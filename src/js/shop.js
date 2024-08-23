import { Cube } from "./cube";
import { Building } from "./building";

export class Shop extends Building {
  constructor(properties) {
    super({
      ...properties,
    });

    this.model = new Cube({
      width: 7,
      height: 9,
      color: { h: 40, w: 76, b: 8 },
      x: this.x,
      y: this.y,
      z: this.z,
    })
  }

  draw() {
    this.model.draw();

    this.model.faces[4].style.background = `
      linear-gradient(
        #0000,
        #0001
      ),
      linear-gradient(90deg,
        hsl(30, 30%, 70%) 1vmin,
        #0000 0 calc(50% - .5vmin),
        hsl(30, 30%, 70%) 0 calc(50% + .5vmin),
        #0000 0 calc(100% - 1vmin),
        hsl(30, 30%, 70%) 0
      ),
      linear-gradient(
        hsl(30, 30%, 70%) 1vmin,
        hsl(200, 5%, 55%) 0 2vmin,
        hsl(30, 30%, 70%) 0 3vmin,
        hsl(200, 5%, 55%) 0 4vmin,
        hsl(30, 30%, 70%) 0 5vmin,
        hsl(200, 5%, 55%) 0 6vmin,
        hsl(30, 30%, 70%) 0
      )
    `;
  }
}

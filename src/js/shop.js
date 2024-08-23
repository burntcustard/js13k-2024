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
      color: { h: 40, w: 80, b: 7 },
      x: this.x,
      y: this.y,
      z: this.z,
    })
  }

  draw() {
    this.model.draw();
  }
}

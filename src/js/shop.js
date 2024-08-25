import { Cube } from "./cube";
import { Building } from "./building";
import { shade } from "./shade";

export class Shop extends Building {
  constructor(properties) {
    super({
      ...properties,
    });

    this.wallColor = { h: 36, w: 80, b: 4 };
    this.windowColor = { h: 192, w: 64, b: 24 };

    this.model = new Cube({
      width: 7,
      height: 9,
      color: this.wallColor,
      x: this.x,
      y: this.y,
      z: this.z,
    });
  }

  draw() {
    this.model.draw();

    this.model.faces.forEach((face, index) => {
      // Don't do anything with the top face
      if (!index) return;

      // somethingColor means {h,w,b} whereas Hwb means CSS string 'hwb(h w b)';
      const faceHwb = shade(this.model.color, face.darkness);
      const windowHwb = shade(this.windowColor, face.darkness * .8);

      face.style.background = `
        linear-gradient(#0000, #0001),
        linear-gradient(90deg,
          ${faceHwb} 1vmin,
          #0000 0 calc(50% - .5vmin),
          ${faceHwb} 0 calc(50% + .5vmin),
          #0000 0 calc(100% - 1vmin),
          ${faceHwb} 0
        ),
        linear-gradient(
          ${faceHwb} 1.2vmin,
          ${windowHwb} 0 2.2vmin,
          ${faceHwb} 0 3.2vmin,
          ${windowHwb} 0 4.2vmin,
          ${faceHwb} 0 5.2vmin,
          ${windowHwb} 0 6.2vmin,
          ${faceHwb} 0
        )
      `;
    });
  }
}

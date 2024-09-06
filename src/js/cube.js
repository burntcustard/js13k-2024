import { Shape } from "./shape";
import { createElement } from "./create-element";
import { settings } from "./settings";
import { shade } from "./shade";

const shadowOverlapPx = 0;
const shadowSkew = 55;
const shadowBlur = .15;

export class Cube extends Shape {
  constructor(properties) {
    super({
      ...properties,
    });

    this.width = properties.width;
    this.height = properties.height ?? properties.width;
    this.depth = properties.depth ?? properties.width;
    this.shadowHeightMulti = properties.shadowHeightMulti ?? 1;
    this.aoIntensity = properties.aoIntensity ?? 1;
  }

  draw() {
    // Create the initial element that contains the cube (this.element)
    super.draw();

    this.element.classList.add('cube');

    // Array of face elements that make up the top and 4 sides of the cube. There is no underside.
    this.faces = [];

    for (let i = 0; i < 6; i++) {
      const face = createElement();
      face.classList.add('face')
      this.faces.push(face);
      this.element.append(face);
    }

    this.shadowElements = createElement();
    this.shadowElements.style.position = 'absolute';
    this.shadowElements.style.inset = '0';
    this.shadowElements.style.display = 'grid';
    this.shadowElements.style.placeItems = 'center';
    // this.shadowElements.style.borderStyle = 'solid';
    this.shadowElements.style.transition = 'filter .5s, opacity .5s, transform .5s';
    this.element.append(this.shadowElements);

    this.shadowElement1 = createElement('div');
    this.shadowElement1.style.position = 'absolute';
    this.shadowElement1.style.transition = 'background .5s';
    this.shadowElements.append(this.shadowElement1);

    this.shadowElement2 = createElement('div');
    this.shadowElement2.style.position = 'absolute';
    this.shadowElement2.style.transition = 'background .5s';
    this.shadowElements.append(this.shadowElement2);

    this.render();
  }

  render() {
    super.render();

    // Note: any CSS being set that's the same as what's already set, isn't a perf issue.

    // Same as the size of the parent element
    this.faces[0].style.width = `calc(${this.depth}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[0].style.height = `calc(${this.width}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[0].style.transform = `translateZ(${this.height + this.float}vmin)`;

    // 4 "sides" of the cube
    this.faces[1].style.transform = `rotateY(-90deg) rotateZ(90deg) translateY(-${this.height / 2  + this.float}vmin) translateZ(${this.depth / 2}vmin)`;
    this.faces[1].style.width = `calc(${this.width}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[1].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[2].style.transform = `rotateX(-90deg) rotateY(180deg) translateY(-${this.height / 2 + this.float}vmin) translateZ(${this.width / 2 }vmin)`;
    this.faces[2].style.width = `calc(${this.depth}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[2].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[3].style.transform = `rotateX(-90deg) rotateY(90deg) translateY(-${this.height / 2 + this.float}vmin) translateZ(${this.depth / 2}vmin)`;
    this.faces[3].style.width = `calc(${this.width}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[3].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[4].style.transform = `rotateX(-90deg) translateY(-${this.height / 2 + this.float}vmin) translateZ(${this.width / 2}vmin)`;
    this.faces[4].style.width = `calc(${this.depth}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[4].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;

    // Floor element to help reduce gappyness. Maybe just use this for tiles? Because doesn't work well on tall cubes...
    this.faces[5].style.width = `calc(${this.depth}vmin - 2px)`;
    this.faces[5].style.height = `calc(${this.width}vmin - 2px)`;
    this.faces[5].style.transform = `translateZ(${this.float}vmin)`;

    this.faces[0].darkness = 2;  // Top
    this.faces[1].darkness = 22; // N (top left)
    this.faces[2].darkness = 6;  // E (top right)
    this.faces[3].darkness = 0;  // S (bottom right)
    this.faces[4].darkness = 18; // W (bottom left)
    this.faces[5].darkness = 2;  // Same as top

    this.faces.forEach((face, index) => {
      if (settings.ao.enabled && index) {
        face.style.background = `
          linear-gradient(
            #0000 ${this.height - settings.ao.size}vmin,
            hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${(face.darkness / 100 * settings.ao.intensity * this.aoIntensity) * (this.float ? 0 : 1)})
          ),
          linear-gradient(${shade(this.color, face.darkness)}, ${shade(this.color, face.darkness)})
        `;
      } else {
        face.style.background = shade(this.color, face.darkness)
      }
    });

    this.shadowElements.style.filter = `blur(${shadowBlur * (Math.sqrt(this.float) + 1)}vmin)`;
    this.shadowElements.style.opacity = 1 / (Math.sqrt(this.float) + 1);
    // this.shadowElements.style.background = this.float > 1 ? `hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a + .1})` : '';
    this.shadowElements.style.transform = `translate(calc(${-this.float}vmin * sin(${shadowSkew}deg)), calc(${this.float}vmin * cos(${shadowSkew}deg)))`;

    // this.shadowElements.style.borderWidth = this.float > 1 ? `${this.width / 2}vmin` : `calc(${shadowBlur}vmin + 1px)`;
    // this.shadowElements.style.borderColor = `
    //   ${this.float > 1 ? `hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a + .1})` : '#0000'}
    //   ${this.float > 1 ? `hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a + .1})` : '#0000'}
    //   hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a + .1})
    //   hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a + .1})
    // `;

    this.shadowElements.style.background = `hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a + .1})`;

    if (this.float) {
      this.shadowElements.style.transition = 'filter .5s, opacity .5s, transform .5s, clip-path 0s'
      // this.shadowElements.style.clipPath = `polygon(0 0, 2000% -1000%, 2000% 2000%, -1000% 2000%)`;
    } else {
      if (this.parent.float) {
        this.shadowElements.style.transition = 'filter .5s, opacity .5s, transform .5s, clip-path .1s';
        this.shadowElements.style.clipPath = `polygon(
          calc(${-((this.parent.width - this.width) / 2 + this.x)}vmin - .5px) 1px,
          calc(100% - 1px) 0,
          100% 200%,
          calc(${-((this.parent.width - this.width) / 2 + this.x)}vmin - .5px) ${(this.parent.width + this.width) / 2 - this.y}vmin)
        `;
      } else {
        this.shadowElements.style.transition = 'filter .5s, opacity .5s, transform .5s, clip-path .3s .3s';
        this.shadowElements.style.clipPath = `polygon(
          -1000% 1px,
          calc(100% - 1px) 0,
          100% 200%,
          -1000% 2000%
        )`;
      }
    }
    // this.shadowElements.style.clipPath = this.float ? '' : `polygon(0 1px, calc(100% - 1px) 0, 100% 200%, -100% 200%)`;
    // this.shadowElements.style.background = 'linear-gradient(red, blue)'

    const shadowHeight = this.height * this.shadowHeightMulti;

    this.shadowElements.style.boxShadow = `-${settings.faceOverlapPx}px ${settings.faceOverlapPx}px ${settings.faceOverlapPx}px hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a + .1}`;

    this.shadowElement1.style.width = `${this.depth}vmin`;
    this.shadowElement1.style.height = `calc(${shadowHeight}vmin * cos(${shadowSkew}deg))`;
    this.shadowElement1.style.background = `linear-gradient(hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a}), #0000)`;
    this.shadowElement1.style.transform = `translateY(calc(${this.width / 2}vmin - ${shadowOverlapPx}px)) skewX(-${shadowSkew}deg) translateY(calc((${shadowHeight}vmin * cos(${shadowSkew}deg) / 2)))`;

    const shadowSkewInvert = 90 - shadowSkew - .5;

    this.shadowElement2.style.width = `${this.width}vmin`;
    this.shadowElement2.style.height = `calc(${shadowHeight}vmin * cos(${shadowSkewInvert}deg))`;
    this.shadowElement2.style.background = `linear-gradient(hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${this.shadowColor.a}), #0000)`;
    this.shadowElement2.style.transform = `rotateZ(90deg) translateY(calc(${this.depth / 2}vmin - ${shadowOverlapPx}px)) skewX(${shadowSkewInvert}deg) translateY(calc((${shadowHeight}vmin * cos(${shadowSkewInvert}deg) / 2)))`;
  }
}

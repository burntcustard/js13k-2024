import { Shape } from "./shape";
import { createElement } from "./create-element";
import { settings } from "./settings";

const faceOverlapPx = .5;
const shadowOverlapPx = 0;

const shadowBlur = .15;
const shadowAlpha = .2;

export class Cube extends Shape {
  constructor(properties) {
    super({
      ...properties,
    });

    this.width = properties.width;
    this.height = properties.height ?? properties.width;
    this.depth = properties.depth ?? properties.width;
  }

  draw() {
    // Create the initial element that contains the cube (this.element)
    super.draw();

    this.element.classList.add('cube');

    // Array of face elements that make up the top and 4 sides of the cube. There is no underside.
    this.faces = [];

    for (let i = 0; i < 5; i++) {
      const face = createElement();
      face.classList.add('face')
      this.faces.push(face);
      this.element.append(face);
    }

    this.faces[0].style.background = `hwb(${this.color.h -  1} ${this.color.w -  2} ${this.color.b +  2})`; // Top
    this.faces[1].style.background = `hwb(${this.color.h - 12} ${this.color.w - 24} ${this.color.b + 24})`; // N (top left)
    this.faces[2].style.background = `hwb(${this.color.h -  3} ${this.color.w -  6} ${this.color.b +  6})`; // E (top right)
    this.faces[3].style.background = `hwb(${this.color.h -  0} ${this.color.w -  0} ${this.color.b +  0})`; // S (bottom right)
    this.faces[4].style.background = `hwb(${this.color.h -  8} ${this.color.w - 16} ${this.color.b + 16})`; // W (bottom left)

    this.shadowElements = createElement();
    this.shadowElements.style.position = 'absolute';
    this.shadowElements.style.inset = '0';
    this.shadowElements.style.display = 'grid';
    this.shadowElements.style.placeItems = 'center';
    this.shadowElements.style.filter = `blur(${shadowBlur}vmin)`;
    this.shadowElements.style.borderColor = `
      #0000
      #0000
      hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${shadowAlpha + .1})
      hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${shadowAlpha + .1})
    `;
    this.shadowElements.style.borderStyle = 'solid';
    this.element.append(this.shadowElements);

    this.shadowElement1 = createElement('div');
    this.shadowElement1.style.position = 'absolute';
    this.shadowElement1.style.width = `${this.depth}vmin`;
    this.shadowElement1.style.height = `${this.height}vmin`;
    this.shadowElement1.style.background = `linear-gradient(hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${shadowAlpha}), #0000)`;
    this.shadowElements.append(this.shadowElement1);

    this.shadowElement2 = createElement('div');
    this.shadowElement2.style.position = 'absolute';
    this.shadowElement2.style.width = `${this.width}vmin`;
    this.shadowElement2.style.height = `${this.height}vmin`;
    this.shadowElement2.style.background = `linear-gradient(hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${shadowAlpha}), #0000)`;
    this.shadowElements.append(this.shadowElement2);

    this.render();
  }

  render() {
    // supder.render(); // There is no shape render yet

    // Update colours of the faces of the cube depending on lighting?

    // Update position/skew of shadows depending on lighting?
    super.render();

    // Same as the size of the parent element
    this.faces[0].style.width = `calc(${this.depth}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[0].style.height = `calc(${this.width}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[0].style.transform = `translateZ(${this.height}vmin)`;

    // 4 "sides" of the cube
    this.faces[1].style.transform = `rotateY(-90deg) rotateZ(90deg) translateY(-${this.height / 2}vmin) translateZ(${this.depth / 2}vmin)`;
    this.faces[1].style.width = `calc(${this.width}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[1].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[2].style.transform = `rotateX(90deg) translateY(${this.height / 2}vmin) translateZ(${this.width / 2}vmin)`;
    this.faces[2].style.width = `calc(${this.depth}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[2].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[3].style.transform = `rotateX(-90deg) rotateY(90deg) translateY(-${this.height / 2}vmin) translateZ(${this.depth / 2}vmin)`;
    this.faces[3].style.width = `calc(${this.width}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[3].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[4].style.transform = `rotateX(-90deg) translateY(-${this.height / 2}vmin) translateZ(${this.width / 2}vmin)`;
    this.faces[4].style.width = `calc(${this.depth}vmin + ${settings.faceOverlapPx}px)`;
    this.faces[4].style.height = `calc(${this.height}vmin + ${settings.faceOverlapPx}px)`;

    this.shadowElements.style.borderWidth = `calc(${shadowBlur}vmin + 1px)`;

    this.shadowElements.style.boxShadow = `-${settings.faceOverlapPx}px ${settings.faceOverlapPx}px ${settings.faceOverlapPx}px hwb(${this.shadowColor.h} ${this.shadowColor.w} ${this.shadowColor.b} / ${shadowAlpha + .1}`;
    this.shadowElements.scale = '.99';

    this.shadowElement1.style.transform = `translateY(calc(${this.width / 2}vmin - ${shadowOverlapPx}px)) skewX(-45deg) translateY(${this.height / 2}vmin)`;

    this.shadowElement2.style.transform = `rotateZ(90deg) translateY(calc(${this.depth / 2}vmin - ${shadowOverlapPx}px)) skewX(45deg) translateY(${this.height / 2}vmin)`;
  }
}

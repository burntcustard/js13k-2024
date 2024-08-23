import { Shape } from "../shape";
import { createElement } from "./create-element";

export class Cube extends Shape {
  constructor(properties) {
    super({
      ...properties,
      width: properties.width,
      height: properties.height ?? properties.width,
      depth: properties.depth ?? properties.width,
      color: properties.color ?? { h: 0, w: 100, b: 0 }, // color: { h, w, b }?
    });
  }

  draw() {
    // Create the initial element that contains the cube (this.element)
    super.draw();

    this.element.classList.add('cube');

    // Array of face elements that make up the top and 4 sides of the cube. There is no underside.
    this.faces = [];

    for (let i = 0; i < 5; i++) {
      const face = createElement();
      face.style.classList.add('face')
      this.faces.push(face);
      this.element.append(face);
    }

    // Same as the size of the parent element
    this.faces[0].style.width = `${this.depth}vmin`;
    this.faces[0].style.height = `${this.width}vmin`;

    // 4 "sides" of the cube
    this.faces[1].style.transform = `rotateY(-90deg) rotateZ(90deg) translateY(${this.height / 2}vmin) translateZ(${this.width / 2}vmin)`;
    this.faces[2].style.transform = `rotateX(90deg) translateY(-${this.height / 2}vmin) translateZ(${this.width / 2}vmin)`;
    this.faces[3].style.transform = `rotateX(-90deg) rotateY(90deg) translateY(${this.height / 2}vmin) translateZ(${this.width / 2}vmin)`;
    this.faces[4].style.transform = `rotateX(-90deg) translateY(${this.height / 2}vmin) translateZ(${this.width / 2}vmin)`;

    // Color the top of the cube. TODO: Fancy lighting
    this.faces[0].style.background = `hwb(${this.color.h} ${this.color.w} ${this.color.b + 10})`;

    this.faces[1].style.background = `hwb(${this.color.h} ${this.color.w} ${this.color.b + 25})`;
    this.faces[2].style.background = `hwb(${this.color.h} ${this.color.w} ${this.color.b + 10})`;
    this.faces[3].style.background = `hwb(${this.color.h} ${this.color.w} ${this.color.b +  0})`;
    this.faces[4].style.background = `hwb(${this.color.h} ${this.color.w} ${this.color.b + 20})`;

    // Create 4 shadow elements that display on the ground around the cube.
    // 2 may not be rendered depending on the position of the sun?
  }

  render() {
    // supder.render(); // There is no shape render yet

    // Update colours of the faces of the cube depending on lighting?

    // Update position/skew of shadows depending on lighting?
  }
}

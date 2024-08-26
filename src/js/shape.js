import { createElement } from "./create-element";

export class Shape {
  constructor(properties) {
    return this.init(properties);
  }

  init(properties) {
    this.x = properties.x ?? 0;
    this.y = properties.y ?? 0;
    this.z = properties.z ?? 0;
    this.rotation = properties.rotation ?? 0;
    this.color = properties.color ?? { h: 0, w: 100, b: 0 }; // color: { h, w, b }?
    this.shadowColor = properties.shadowColor ?? { h: 0, w: 0, b: 100, a: .2 };
    this.tile = properties.tile;
    this.float = properties.float ?? 0;
    this.parent = properties.parent ?? {};
  }

  shapeRender() {
    this.element.style.translate = `${this.x}vmin ${this.y}vmin ${this.z}vmin`;
  }

  draw() {
    // There is no element before draw() is called

    this.element = createElement();
    this.element.classList.add('shape');

    // The base element is the depth on the x axis and width on the y axis
    this.element.style.width = `${this.depth}vmin`;
    this.element.style.height = `${this.width}vmin`;

    // In general, shapes have no pointer events. But individual elements inside them might do?
    this.element.style.pointerEvents = 'none';

    this.shapeRender();
  }

  addTo(element) {
    element.append(this.element);
  }

  render() {
    this.shapeRender();
  }

  update() {

  }
}

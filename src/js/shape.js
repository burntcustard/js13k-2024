import { createElement } from "./create-element";

export class Shape {
  constructor(properties) {
    return this.init(properties);
  }

  init(properties) {
    this.x = properties.x;
    this.y = properties.y;
    this.rotation = properties.rotation ?? 0;
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
  }

  addTo(element) {
    element.append(this.element);
  }
}

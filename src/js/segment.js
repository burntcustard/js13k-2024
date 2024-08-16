import { createElement } from "./create-element";

export class Segment {
  constructor(properties) {
    return this.init(properties);
  }

  init(properties = {}) {
    this.rotation = properties.rotation ?? 0;
  }

  addToDom() {
    this.element = createElement('div', `
      width: ${cellCssSize / 2}vmin;
      height: ${cellCssSize / 2}vmin;
    `);

    this.tile.element.append(this.element);
  }
}

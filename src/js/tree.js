import { Cube } from "./cube";

export class Tree {
  constructor(properties) {
    return this.init(properties);
  }

  init(properties) {
    this.x = properties.x;
    this.y = properties.y;
    this.z = properties.z;
    this.height = properties.height ?? 5;

    this.trunk = new Cube({
      x: this.x,
      y: this.y,
      z: this.z,
      width: .4,
      height: this.height,
      color: { h: 0, w: 100, b: 16 }
    });

    this.leaf = new Cube({
      x: this.x,
      y: this.y,
      z: this.z,
      float: this.height,
      width: 2,
      height: 2,
      color: { h: 90, w: 70, b: 20 }
    });
  }

  draw() {
    this.trunk.draw();
    this.leaf.draw();
  }

  addTo(element) {
    element.append(this.trunk.element);
    element.append(this.leaf.element);
  }

  update() {
    this.trunk.z = this.z;
    this.leaf.z = this.z;
    this.trunk.update();
    this.leaf.update();
  }

  render() {
    this.trunk.render();
    this.leaf.render();
  }
}

import { createElement } from "./create-element";
import { createSvgElement } from "./create-svg-element";
import { cellCssSize } from "./grid";
import { Cube } from "./cube";
import { Shop } from "./shop";

export class Tile {
  constructor(properties) {
    return this.init(properties);
  }

  init(properties) {
    this.x = properties.x;
    this.y = properties.y;
    this.rotation = properties.rotation ?? 0;
    this.segments = properties.segments;
    this.floating = properties.floating ?? 0; // 0 or 1 so it can be used as a shadow multiplier

    this.segments.forEach((segment, index) => {
      segment.x = index % 2;
      segment.y = Math.floor(index / 2);
      segment.tile = this;
    });

    this.base = new Cube({
      width: cellCssSize,
      height: 1,
      color: { h: 30, w: 90, b: 3 },
      shadowColor: { h: 160, w: 0, b: 80, a: .2 },
      shadowHeightMulti: 1.4,
      aoIntensity: 3,
      tile: this,
      floating: this.floating,
    });

    this.testShop = new Shop({
      x: -4,
      y: -4,
      z: 1,
      tile: this,
    });
  }

  place() {
    this.floating = 0;
    this.base.floating = 0;
    this.render();
  }

  lift() {
    this.floating = 1;
    this.base.floating = 1;
    this.render();
  }

  draw() {
    this.base.draw();

    this.svgElement = createSvgElement();
    this.svgElement.style.width = `${cellCssSize}vmin`;
    this.svgElement.style.height = `${cellCssSize}vmin`;
    this.svgElement.setAttribute('viewBox', '0 0 4 4');

    const roadElement = createSvgElement('path');
    roadElement.setAttribute('stroke', '#556');
    roadElement.setAttribute('d', 'm 0 2.6 h 4');
    this.svgElement.append(roadElement);

    const roadLineElement = createSvgElement('path');
    roadLineElement.setAttribute('stroke', '#eee');
    roadLineElement.setAttribute('stroke-width', '0.05');
    roadLineElement.setAttribute('d', 'm 0 2.4 h 4');
    this.svgElement.append(roadLineElement);

    const roadLineElement2 = createSvgElement('path');
    roadLineElement2.setAttribute('stroke', '#eee');
    roadLineElement2.setAttribute('stroke-width', '0.05');
    roadLineElement2.setAttribute('d', 'm 0 2.95 h 4');
    this.svgElement.append(roadLineElement2);

    const buildingBaseElement = createSvgElement('path');
    buildingBaseElement.setAttribute('stroke-width', '.3');
    buildingBaseElement.setAttribute('fill', 'hsl(30 40% 75%)');
    buildingBaseElement.setAttribute('stroke', 'hsl(25 40% 90%)');
    buildingBaseElement.setAttribute('d', 'm.15 .15 l3.7 0l0 2l-3.7 0l0 -2');
    this.svgElement.append(buildingBaseElement);

    const buildingBaseElement2 = createSvgElement('path');
    buildingBaseElement2.setAttribute('stroke-width', '.3');
    buildingBaseElement2.setAttribute('fill', 'hsl(30 40% 75%)');
    buildingBaseElement2.setAttribute('stroke', 'hsl(25 40% 90%)');
    buildingBaseElement2.setAttribute('d', 'm.15 3.2 l3.7 0l0 .65l-3.7 0z');
    this.svgElement.append(buildingBaseElement2);

    this.testShop.draw();

    this.testShop.addTo(this.base.element);
  }

  addTo(element) {
    element.append(this.base.element);
  }

  update(dt) {

  }

  render() {
    this.base.render();
    this.testShop.render();
  }
}

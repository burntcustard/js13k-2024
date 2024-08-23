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

    this.segments.forEach((segment, index) => {
      segment.x = index % 2;
      segment.y = Math.floor(index / 2);
      segment.tile = this;
    });

    this.base = new Cube({
      width: cellCssSize,
      height: 1,
      color: { h: 30, w: 90, b: 3 },
      shadowColor: { h: 120, w: 0, b: 90 },
    });

    // this.base.element.append(this.svgElement);

    this.testShop = new Shop({
      x: -4,
      y: -4,
      z: 1,
    });

    // const buildingCssWidth = 7;
    // const buildingCssHeight = 9;
    // const buildingScale = 1;

    // const buildingShadowElement = createElement();
    // buildingShadowElement.style.background = `linear-gradient(#0005, #0000)`;
    // buildingShadowElement.style.width = `${buildingCssWidth * 1.4}vmin`;
    // buildingShadowElement.style.height = `${buildingScale * 10}vmin`;
    // buildingShadowElement.style.position = 'absolute';
    // buildingShadowElement.style.transform = `translateX(-8.4vmin) translateY(-1.3vmin) rotate(45deg)`;
    // buildingShadowElement.style.filter = 'blur(.2vmin)';
    // this.base.element.append(buildingShadowElement);

    // // Test building
    // this.building1 = createElement('div');
    // this.building1.classList.add('cube');
    // this.building1.style.width = `${buildingCssWidth}vmin`;
    // this.building1.style.height = `${buildingCssWidth}vmin`;
    // this.building1.style.background = 'hsl(40, 45%, 83%)';
    // this.building1.style.transform = `translateX(-5vmin) translateY(-5vmin) translateZ(${buildingCssHeight}vmin)`; // Raise up by height of building
    // this.building1.sides = [
    //   createElement(),
    //   createElement(),
    //   createElement(),
    //   createElement(),
    // ];
    // this.building1.sides.forEach(side => {
    //   side.classList.add('face');
    //   side.style.height = `${buildingCssHeight}vmin`;
    //   this.building1.append(side);
    // })
    // this.base.element.append(this.building1);
    // this.building1.sides[0].style.transform = `rotateY(-90deg) rotateZ(90deg) translateY(${buildingCssHeight / 2}vmin) translateZ(${buildingCssWidth / 2}vmin)`;
    // this.building1.sides[1].style.transform = `rotateX(90deg) translateY(-${buildingCssHeight / 2}vmin) translateZ(${buildingCssWidth / 2}vmin)`;
    // this.building1.sides[2].style.transform = `rotateX(-90deg) rotateY(90deg) translateY(${buildingCssHeight / 2}vmin) translateZ(${buildingCssWidth / 2}vmin)`;
    // this.building1.sides[2].style.background = `
    //   linear-gradient(
    //     #0000,
    //     #0001
    //   ),
    //   linear-gradient(90deg,
    //     hsl(40, 45%, 85%) 1vmin,
    //     #0000 0 calc(50% - .5vmin),
    //     hsl(40, 45%, 85%) 0 calc(50% + .5vmin),
    //     #0000 0 calc(100% - 1vmin),
    //     hsl(40, 45%, 85%) 0
    //   ),
    //   linear-gradient(
    //     hsl(40, 45%, 85%) 1vmin,
    //     hsl(200, 20%, 80%) 0 2vmin,
    //     hsl(40, 45%, 85%) 0 3vmin,
    //     hsl(200, 20%, 80%) 0 4vmin,
    //     hsl(40, 45%, 85%) 0 5vmin,
    //     hsl(200, 20%, 80%) 0 6vmin,
    //     hsl(40, 45%, 85%) 0
    //   )
    // `;

    // this.building1.sides[3].style.transform = `rotateX(-90deg) translateY(${buildingCssHeight / 2}vmin) translateZ(${buildingCssWidth / 2}vmin)`;

    // this.building1.sides[3].style.background = `
    //   linear-gradient(
    //     #0000,
    //     #0001
    //   ),
    //   linear-gradient(90deg,
    //     hsl(30, 30%, 70%) 1vmin,
    //     #0000 0 calc(50% - .5vmin),
    //     hsl(30, 30%, 70%) 0 calc(50% + .5vmin),
    //     #0000 0 calc(100% - 1vmin),
    //     hsl(30, 30%, 70%) 0
    //   ),
    //   linear-gradient(
    //     hsl(30, 30%, 70%) 1vmin,
    //     hsl(200, 5%, 55%) 0 2vmin,
    //     hsl(30, 30%, 70%) 0 3vmin,
    //     hsl(200, 5%, 55%) 0 4vmin,
    //     hsl(30, 30%, 70%) 0 5vmin,
    //     hsl(200, 5%, 55%) 0 6vmin,
    //     hsl(30, 30%, 70%) 0
    //   )
    // `;
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

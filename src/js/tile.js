import { createElement } from "./create-element";
import { createSvgElement } from "./create-svg-element";
import { cellCssSize } from "./grid";

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

    this.element = createElement();
    this.element.style.width = `${cellCssSize}vmin`;
    this.element.style.height = `${cellCssSize}vmin`;
    this.element.classList.add('cube');

    this.sides = [
      createElement(),
      createElement(),
      createElement(),
      createElement(),
    ];

    this.sides.forEach(side => {
      side.classList.add('face');
      side.style.height = `${cellCssSize / 3}vmin` // 3:1 aspect ratio sides?
      this.element.append(side);
    });

    this.sides[0].style.transform = `rotateY(-90deg) rotateZ(90deg) translateY(${cellCssSize / 6}vmin) translateZ(${cellCssSize / 2}vmin)`;
    this.sides[1].style.transform = `rotateX(90deg) translateY(-${cellCssSize / 6}vmin) translateZ(${cellCssSize / 2}vmin)`;
    this.sides[2].style.transform = `rotateX(-90deg) rotateY(90deg) translateY(${cellCssSize / 6}vmin) translateZ(${cellCssSize / 2}vmin)`;
    this.sides[3].style.transform = `rotateX(-90deg) translateY(${cellCssSize / 6}vmin) translateZ(${cellCssSize / 2}vmin)`;
    this.sides[2].style.display = 'none';
    this.sides[3].style.display = 'none';

    this.svgElement = createSvgElement();
    this.svgElement.style.width = `${cellCssSize}vmin`;
    this.svgElement.style.height = `${cellCssSize}vmin`;

    this.element.append(this.svgElement);

    const buildingCssWidth = 8;
    const buildingCssHeight = 17;
    const buildingScale = 1;

    // Test building
    this.building1 = createElement('div');
    this.building1.classList.add('cube');
    this.building1.style.width = `${buildingCssWidth}vmin`;
    this.building1.style.height = `${buildingCssWidth}vmin`;
    this.building1.style.background = '#291676';
    this.building1.style.transform = `translateX(-5vmin) translateY(-5vmin) translateZ(${buildingCssHeight}vmin)`; // Raise up by height of building
    this.building1.sides = [
      createElement(),
      createElement(),
      createElement(),
      createElement(),
    ];
    this.building1.sides.forEach(side => {
      side.classList.add('face');
      side.style.height = `${buildingCssHeight * 2}vmin`;
      this.building1.append(side);
    })
    this.element.append(this.building1);
    this.building1.sides[0].style.transform = `rotateY(-90deg) rotateZ(90deg) translateY(${buildingCssHeight}vmin) translateZ(${buildingCssWidth / 2}vmin)`;
    this.building1.sides[1].style.transform = `rotateX(90deg) translateY(-${buildingCssHeight}vmin) translateZ(${buildingCssWidth / 2}vmin)`;
    this.building1.sides[2].style.transform = `rotateX(-90deg) rotateY(90deg) translateY(${buildingCssHeight}vmin) translateZ(${buildingCssWidth / 2}vmin)`;
    this.building1.sides[2].style.background = `
      linear-gradient(
        #0000 calc(50% - ${buildingScale * 2}vmin),
        #0002 50%,
        #0000 calc(50% + ${buildingScale * 2}vmin)
      ),
      linear-gradient(90deg,
        #216 ${buildingScale * 1}vmin,
        #0000 0 ${buildingCssWidth - 1}vmin,
        #216 0
      ),
      linear-gradient(
        #216 ${buildingScale * 1}vmin,
        #4de 0 ${buildingScale * 2}vmin,
        #216 0 ${buildingScale * 3}vmin,
        #4de 0 ${buildingScale * 4}vmin,
        #216 0 ${buildingScale * 5}vmin,
        #4de 0 ${buildingScale * 6}vmin,
        #216 0 ${buildingScale * 7}vmin,
        #4de 0 ${buildingScale * 8}vmin,
        #216 0 ${buildingScale * 9}vmin,
        #56f 0 ${buildingScale * 10}vmin,
        #216 0 ${buildingScale * 11}vmin,
        #56f 0 ${buildingScale * 12}vmin,
        #216 0 ${buildingScale * 13}vmin,
        #b2f 0 ${buildingScale * 14}vmin,
        #216 0 ${buildingScale * 15}vmin,
        #b2f 0 ${buildingScale * 16}vmin,
        #216 0 ${buildingScale * 18}vmin,
        #b2f 0 ${buildingScale * 19}vmin,
        #216 0 ${buildingScale * 20}vmin,
        #b2f 0 ${buildingScale * 21}vmin,
        #216 0 ${buildingScale * 22}vmin,
        #56f 0 ${buildingScale * 23}vmin,
        #216 0 ${buildingScale * 24}vmin,
        #56f 0 ${buildingScale * 25}vmin,
        #216 0 ${buildingScale * 26}vmin,
        #4de 0 ${buildingScale * 27}vmin,
        #216 0 ${buildingScale * 28}vmin,
        #4de 0 ${buildingScale * 29}vmin,
        #216 0 ${buildingScale * 30}vmin,
        #4de 0 ${buildingScale * 31}vmin,
        #216 0 ${buildingScale * 32}vmin,
        #4de 0 ${buildingScale * 33}vmin,
        #216 0
      )
    `;
    this.building1.sides[2].style.mask = 'linear-gradient(#000 50%, #0000)';
    const blurryness1 = createElement('div', `
      position: absolute;
      inset: -${buildingScale}vmin;
      backdrop-filter: blur(${buildingScale / 2}vmin) brightness(1.2) contrast(3) saturate(.5);
      mask: linear-gradient(0deg, #000 ${buildingScale}vmin, #0000);
    `);
    this.building1.sides[2].append(blurryness1);
    this.building1.sides[3].style.transform = `rotateX(-90deg) translateY(${buildingCssHeight}vmin) translateZ(${buildingCssWidth / 2}vmin)`;
    this.building1.sides[3].style.background = `
      linear-gradient(
        #0000 calc(50% - ${buildingScale * 2}vmin),
        #0002 50%,
        #0000 calc(50% + ${buildingScale * 2}vmin)
      ),
      linear-gradient(90deg,
        #104 ${buildingScale * 1}vmin,
        #0000 0 ${buildingCssWidth - 1}vmin,
        #104 0
      ),
      linear-gradient(
        #104 ${buildingScale * 1}vmin,
        #4de 0 ${buildingScale * 2}vmin,
        #104 0 ${buildingScale * 3}vmin,
        #4de 0 ${buildingScale * 4}vmin,
        #104 0 ${buildingScale * 5}vmin,
        #4de 0 ${buildingScale * 6}vmin,
        #104 0 ${buildingScale * 7}vmin,
        #4de 0 ${buildingScale * 8}vmin,
        #104 0 ${buildingScale * 9}vmin,
        #56f 0 ${buildingScale * 10}vmin,
        #104 0 ${buildingScale * 11}vmin,
        #56f 0 ${buildingScale * 12}vmin,
        #104 0 ${buildingScale * 13}vmin,
        #b2f 0 ${buildingScale * 14}vmin,
        #104 0 ${buildingScale * 15}vmin,
        #b2f 0 ${buildingScale * 16}vmin,
        #104 0 ${buildingScale * 18}vmin,
        #b2f 0 ${buildingScale * 19}vmin,
        #104 0 ${buildingScale * 20}vmin,
        #b2f 0 ${buildingScale * 21}vmin,
        #104 0 ${buildingScale * 22}vmin,
        #56f 0 ${buildingScale * 23}vmin,
        #104 0 ${buildingScale * 24}vmin,
        #56f 0 ${buildingScale * 25}vmin,
        #104 0 ${buildingScale * 26}vmin,
        #4de 0 ${buildingScale * 27}vmin,
        #104 0 ${buildingScale * 28}vmin,
        #4de 0 ${buildingScale * 29}vmin,
        #104 0 ${buildingScale * 30}vmin,
        #4de 0 ${buildingScale * 31}vmin,
        #104 0 ${buildingScale * 32}vmin,
        #4de 0 ${buildingScale * 33}vmin,
        #104 0
      )
    `;
    this.building1.sides[3].style.mask = 'linear-gradient(#000 50%, #0000)';
    const blurryness2 = createElement('div', `
      position: absolute;
      inset: -${buildingScale}vmin;
      backdrop-filter: brightness(1.2) contrast(3) saturate(.5) blur(${buildingScale * 2}vmin);
      mask: linear-gradient(0deg, #000 ${buildingScale}vmin, #0009 50%, #0000 0);
    `);
    this.building1.sides[3].append(blurryness2);
  }

  addTo(element) {
    element.append(this.element);
  }

  update(dt) {

  }

  render() {

  }
}

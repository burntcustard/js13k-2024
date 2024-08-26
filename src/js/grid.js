import { createElement } from "./create-element";

export const cellCssSize = 20;
export const gridColRowCount = 9;  // Number of rows and columns in the grid
const gridCssWidth = cellCssSize * gridColRowCount;
const gridCssHeight = cellCssSize * gridColRowCount;

export const grid = document.querySelector('.grid');

grid.style.width = `${gridCssWidth}vmin`;
grid.style.height = `${gridCssHeight}vmin`;
grid.style.grid = `repeat(${gridColRowCount}, ${cellCssSize}vmin) / repeat(${gridColRowCount}, ${cellCssSize}vmin);`

export const cells = [];

for (let i = 0; i < gridColRowCount * gridColRowCount; i++) {
  const cell = createElement();

  cell.coords = {
    x: i % gridColRowCount,
    y: Math.floor(i / gridColRowCount),
  };

  cell.classList.add('cell');
  // cell.onpointerover = () => {
  //   // Move the currently selected tile here?
  // };
  cell.onpointerout = () => {
    // Remove... stuff?
  };

  grid.appendChild(cell);
  cells.push(cell);
}

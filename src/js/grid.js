import { createElement } from "./create-element";

export const cellCssSize = 20;
const gridColRowCount = 5;  // Number of rows and columns in the grid
const gridCssWidth = cellCssSize * gridColRowCount;
const gridCssHeight = cellCssSize * gridColRowCount;

export const grid = document.querySelector('.grid');

grid.style.width = `${gridCssWidth}vmin`;
grid.style.height = `${gridCssHeight}vmin`;
grid.style.grid = `repeat(${gridColRowCount}, ${cellCssSize}vmin) / repeat(${gridColRowCount}, ${cellCssSize}vmin);`

for (let i = 0; i < gridColRowCount * gridColRowCount; i++) {
  const cell = createElement();
  cell.classList.add('cell');
  cell.onpointerover = () => {
    // Move the currently selected tile here?
  };
  cell.onpointerout = () => {
    // Remove... stuff?
  };
  grid.appendChild(cell);
}

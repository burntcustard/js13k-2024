import { RoadSegment } from "../segments/road";
import { ShopSegment } from "../segments/shop";
import { Tile } from "../tile";
import { createSvgElement } from "../create-svg-element";

export class RoadShopTile extends Tile {
  constructor(properties) {
    super({
      ...properties,
      segments: [
        new RoadSegment(),
        new RoadSegment(),
        new ShopSegment(),
        new ShopSegment(),
      ],
    });
  }

  addToHTML() {
    // This tile is an element

    // Add an SVG for the floor

    // Road lines
  }
}

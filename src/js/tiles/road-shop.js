import { RoadSegment } from "../segments/road";
import { ShopSegment } from "../segments/shop";
import { Tile } from "../tile";

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
}

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
  }

  update(dt) {

  }

  render() {

  }
}

import { Segment } from "../segment";

export class RoadSegment extends Segment {
  constructor(properties) {
    super({
      ...properties,
      type: 'road',
    });
  }
}

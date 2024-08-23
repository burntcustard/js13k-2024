export class Building {
  constructor(properties) {
    return this.init(properties);
  }

  init(properties) {
    this.x = properties.x;
    this.y = properties.y;
    this.z = properties.z;
  }

  addTo(element) {
    element.append(this.model.element);
  }

  render() {
    this.model.render();
  }
}

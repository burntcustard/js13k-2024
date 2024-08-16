const maxZoom = 6;
const minZoom = -6;

function Camera() {
  this.x = 0;
  this.y = 0;
  this.zoom = 0;
  this.rx = 60;
  this.rz = 45;
  this.cameraElement = document.querySelector('.camera');
  this.sceneElement = document.querySelector('.scene');

  this.setPosition = () => {
    this.sceneElement.style.transform = `rotateX(${this.rx}deg) rotateZ(${this.rz}deg);`
    this.cameraElement.style.transform = `translateZ(${3000 * Math.log(this.zoom - minZoom + 1)}px)`
  }

  this.changeZoom = (value) => {
    this.zoom = Math.min(Math.max(this.zoom - value, minZoom), maxZoom)
    // console.log(`zoom: ${this.zoom}`);
    this.setPosition();
  };

  this.rotateLeft = () => {
    this.rz -= 90;
    this.sceneElement.style.willChange = 'transform';
    this.setPosition();
    setTimeout(() => this.sceneElement.style.willChange = '', 400);
  }

  this.rotateRight = () => {
    this.rz += 90;
    this.sceneElement.style.willChange = 'transform';
    this.setPosition();
    setTimeout(() => this.sceneElement.style.willChange = '', 400);
  }

  this.setPosition();
  this.cameraElement.style.willChange = 'transform';
  this.cameraElement.style.transition = 'transform .1s';
}

export const camera = new Camera();

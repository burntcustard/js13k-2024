// import { $ } from './util';
import { camera } from './camera';

const viewport = document.querySelector('.viewport');

export default function initMouse() {
  // viewport.addEventListener('mousemove', (event) => {
  //   if (SceneController.started) {
  //     event.preventDefault();

  //     if (mouseOld.x !== undefined && event.buttons === 1) {
  //       camera.rotate(mouseOld.x - event.clientX, mouseOld.y - event.clientY);
  //     }

  //     mouseOld.x = event.clientX;
  //     mouseOld.y = event.clientY;
  //   }
  // });

  viewport.addEventListener('wheel', (event) => {
    // if (SceneController.started) {
      camera.changeZoom(Math.sign(event.deltaY));
      // console.log(event.deltaY);
    // }
  });
}

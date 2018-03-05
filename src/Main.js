import { Loader } from './Loader.js';
import { Frame } from './Frame.js';
import { Canvas } from './Canvas.js';
import { Calculation } from './Calculation.js';
import { Cut } from './Cut.js';
import { Draw } from './Draw.js'

export class Main {
   constructor(el, preview) {
      el.onselectstart = new Function('event.returnValue=false;');
      this.el = el;
      this.preview = preview;
      this.frame = Frame.getInstance(this.el);
      this.calculation = new Calculation();
      this.cut = new Cut();
      this.init();
   }

   createPreviewCanvas() {
      this.pCanvas = Canvas.create(this.preview.getBoundingClientRect());
      this.pCtx = this.pCanvas.getContext('2d');
      this.preview.appendChild(this.pCanvas);
   }

   showImage(image) {
      this.el.appendChild(image);
      const [top, right, bottom, left] = this.calculation.calculation(image.getBoundingClientRect(), this.el.getBoundingClientRect());
      if (top === 0) { }
      image.style = `position: absolute;
      z-index: 1;
      top: ${top}px;
      left: ${left}px;`
   }

   windowEvent() {
      window.addEventListener('mousemove', e => {
         e.stopPropagation();
         if (this.frame.nowContact !== null) {
            this.frame.changeSize(e);
            this.drawPreview(...this.frame.getPoint());
         }
      });
   }

   drawPreview(top, right, bottom, left) {
      const cut = this.cut.cut(this.oImage.getBoundingClientRect(), this.el.getBoundingClientRect());
      // console.log(top - this.frameSize[0], right - this.frameSize[1], bottom - this.frameSize[2], left - this.frameSize[3])
      console.log(cut)
   }

   init() {
      this.createPreviewCanvas();
      Loader.onloaded('2.jpg').then(response => {
         this.showImage(response);
      });
   }
}

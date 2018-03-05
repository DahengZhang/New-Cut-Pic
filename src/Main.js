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

   createPreviewCanvas() {
      this.pCanvas = Canvas.create(this.preview.getBoundingClientRect());
      this.pCtx = this.pCanvas.getContext('2d');
      this.preview.appendChild(this.pCanvas);
   }

   init() {
      this.createPreviewCanvas();
      const oImage = Loader.onloaded('2.jpg');
      const sImage = Loader.onloaded('2.jpg');
      Promise.all([oImage, sImage]).then(response => {
         this.oImage = response[0];
         this.sImage = response[1];
         this.sImage.draggable = false;
         this.el.appendChild(this.sImage);
         this.frameSize = this.calculation.calculation(this.sImage.getBoundingClientRect(), this.el.getBoundingClientRect());
         this.frame.setMaxSize(...this.frameSize);
         this.sImage.style = 'width: 100%; height: 100%; object-fit: scale-down; user-select: none;';
         this.windowEvent();
      });
   }
}

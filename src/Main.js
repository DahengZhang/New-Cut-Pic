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
        let imageWidth = 0;
        let imageHeight = 0;
        if (top === 0) {
            imageWidth = this.el.getBoundingClientRect().width - right - left;
            imageHeight = this.el.getBoundingClientRect().height;
        } else {
            imageWidth = this.el.getBoundingClientRect().width;
            imageHeight = this.el.getBoundingClientRect().height - top - bottom;
        }
        this.scale = image.getBoundingClientRect().width / imageWidth;
        image.style = `position: absolute;
        z-index: 1;
        top: ${top}px;
        left: ${left}px;
        width: ${imageWidth}px;
        height: ${imageHeight}px;`
        this.frame.setMaxSize(top, right, bottom, left);
        this.frameSize = [top, right, bottom, left];
        this.drawPreview(...this.frame.getPoint());
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
        top = top * this.scale;
        right = right * this.scale;
        bottom = bottom * this.scale;
        left = left * this.scale;
        const srcX = left - this.frameSize[3] * this.scale;
        const srcY = top - this.frameSize[0] * this.scale;
        const srcW = this.image.getBoundingClientRect().width * this.scale - srcX - right + this.frameSize[1] * this.scale;
        const srcH = this.image.getBoundingClientRect().height * this.scale - srcY - bottom + this.frameSize[2] * this.scale;
        const d = this.cut.cut({ width: srcW, height: srcH }, this.preview.getBoundingClientRect());
        this.pCtx.clearRect(0, 0, this.preview.getBoundingClientRect().width, this.preview.getBoundingClientRect().height);
        Draw.drawImage(this.image, this.pCtx, srcX, srcY, srcW, srcH, ...d);
    }

    init() {
        this.createPreviewCanvas();
        this.windowEvent();
        Loader.onloaded('0.jpg').then(response => {
            this.image = response;
            this.showImage(response);
        });
    }
}

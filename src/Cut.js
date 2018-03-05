// 剪切图片
export class Cut {
   constructor() { }

   xCalculation() {
      const scale = this.imageSize.height / this.canvas.height;
      const newWidth = this.imageSize.width / scale;
      const x = this.canvas.width / 2 - newWidth / 2;
      return [0, 0, this.imageSize.width, this.imageSize.height, x, 0, newWidth, this.canvas.height]
   }

   yCalculation() {
      const scale = this.imageSize.width / this.canvas.width;
      const newHeight = this.imageSize.height / scale;
      const y = this.canvas.height / 2 - newHeight / 2;
      return [0, 0, this.imageSize.width, this.imageSize.height, 0, y, this.canvas.width, newHeight]
   }

   cut(imageSize, canvas) {
      /**
       * [ 要剪裁的起始 X 坐标, 要剪裁的起始 Y 坐标, 剪裁的宽度, 剪裁的高度, 放置的 x 坐标, 放置的 y 坐标 ]
       */
      console.log(imageSize, canvas)
      this.imageSize = imageSize;
      this.canvas = canvas;
      const canvasScale = canvas.width / canvas.height;
      const imageSizeScale = imageSize.width / imageSize.height;
      if (canvasScale > imageSizeScale) {
         return this.xCalculation();
      } else if (canvasScale < imageSizeScale) {
         return this.yCalculation();
      } else {
         return [0, 0, imageSize.width, imageSize.height, 0, 0, canvas.width, canvas.height];
      }
   }
}
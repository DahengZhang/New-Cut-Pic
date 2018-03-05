// 计算显示时的尺寸
export class Calculation {
   constructor() { }

   xCalculation() {
      const scale = this.el.height / this.wrapper.height;
      const padding = this.wrapper.width / 2 - this.el.width / scale / 2;
      return [0, padding, 0, padding];
   }

   yCalculation() {
      const scale = this.el.width / this.wrapper.width;
      const padding = this.wrapper.height / 2 - this.el.height / scale / 2;
      return [padding, 0, padding, 0]
   }

   calculation(elementSize, wrapperSize) {
      this.el = elementSize;
      this.wrapper = wrapperSize;
      this.elScale = this.el.width / this.el.height;
      this.wrapperScale = this.wrapper.width / this.wrapper.height;
      if (this.wrapperScale > this.elScale) {
         return this.xCalculation();
      } else if (this.wrapperScale < this.elScale) {
         return this.yCalculation();
      } else {
         return [0, 0, 0, 0];
      }
   }
}

// 创建 Canvas 
export class Canvas {
   constructor() { }

   static create(wrapper) {
      const canvas = document.createElement('canvas');
      canvas.width = wrapper.width;
      canvas.height = wrapper.height;
      return canvas;
   }

   static toBase64(canvas) {
      return canvas.toDataURL()
   }
}

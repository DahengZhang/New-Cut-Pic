// 绘画
export class Draw {
   constructor() { }

   /**
    * img 传入 Image 对象
    * ctx
    * srcX 要剪裁的起始 X 坐标
    * srcY 要剪裁的起始 Y 坐标
    * srcW 剪裁图片的宽度
    * srcH 剪裁图片的高度
    * x 放置的 x 坐标
    * y 放置的 y 坐标
    * width 要使用的宽度
    * height 要使用的高度
    */
   static drawImage(img,
      ctx,
      srcX = 0,
      srcY = 0,
      srcW = 0,
      srcH = 0,
      x = 0, y = 0,
      width = 0,
      height = 0) {
      ctx.drawImage(
         img,
         srcX,
         srcY,
         srcW,
         srcH,
         x, y,
         width,
         height
      )
   }
}

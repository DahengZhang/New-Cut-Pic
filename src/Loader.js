export class Loader {
   constructor() { }

   static onloaded(imageUrl) {
      const image = new Image();
      image.src = imageUrl;
      return new Promise((resolve, reject) => {
         image.onload = () => {
            resolve(image);
         }
      })
   }
}

export class Frame {
   constructor(wrapper) {
      wrapper.style.position = 'relative';
      this.wrapper = wrapper;
      this.wrapperStyle = wrapper.getBoundingClientRect();
      this.nowContact = null;
      this.paddingTop = null;
      this.paddingLeft = null;
      this.init();
   }

   static getInstance(wrapper) {
      if (!Frame.instance) {
         Frame.instance = new Frame(wrapper);
      }
      return Frame.instance;
   }

   setMaxSize(top = 0, right = 0, bottom = 0, left = 0) {
      this.maxSize = {
         top,
         right,
         bottom,
         left
      }
      this.setFramePosition(top, right, bottom, left);
   }

   setMinSize(width = 3, height = 3) {
      this.minSize = {
         width: width > 3 ? width : 3,
         height: height > 3 ? height : 3
      }
   }

   setFramePosition(top = 0, right = 0, bottom = 0, left = 0) {
      this.framePosition = {
         top,
         right,
         bottom,
         left
      }
      this.frame.style = this.getFrameStyle();
   }

   getFrameStyle() {
      return `border: 1px solid #FFFFFF;
      z-index: 2;
      position: absolute;
      top: ${this.framePosition.top}px;
      right: ${this.framePosition.right}px;
      bottom: ${this.framePosition.bottom}px;
      left: ${this.framePosition.left}px;
      box-size: border-box;
      cursor: move;`;
   }

   createContact(wrapper, position) {
      const contact = document.createElement('span');
      contact.style = `position: absolute;
         display: inline-block;
         width: 10px;
         height: 10px;
         left: ${position.x};
         top: ${position.y};
         background-color: #FFFFFF;
         border: 1px solid #000000;
         transform: translate(-50%, -50%);
         ${position.style}`
      contact.addEventListener('mousedown', e => {
         e.stopPropagation();
         this.nowContact = position.sign;
      })
      wrapper.appendChild(contact);
   }

   getPositoin(e) {
      const x = e.clientX - this.wrapperStyle.left;
      const y = e.clientY - this.wrapperStyle.top;
      return { x, y }
   }

   getPoint() {
      const top = this.framePosition.top;
      const right = this.framePosition.right;
      const bottom = this.framePosition.bottom;
      const left = this.framePosition.left;
      return [top, right, bottom, left];
   }

   topMove(position) {
      this.frame.style.top = position.y + 'px';
      this.framePosition.top = position.y;
      if (this.framePosition.top < this.maxSize.top) {
         this.framePosition.top = this.maxSize.top;
         this.frame.style.top = this.framePosition.top + 'px';
      }
      if (this.frame.getBoundingClientRect().height < this.minSize.height) {

         this.framePosition.top = this.wrapperStyle.height - this.framePosition.bottom - this.minSize.height;
         this.frame.style.top = this.framePosition.top + 'px';
      }
   }

   rightMove(position) {
      this.frame.style.right = (this.wrapperStyle.width - position.x) + 'px';
      this.framePosition.right = this.wrapperStyle.width - position.x;
      if (this.framePosition.right < this.maxSize.right) {
         this.framePosition.right = this.maxSize.right;
         this.frame.style.right = this.framePosition.right + 'px';
      }
      if (this.frame.getBoundingClientRect().width < this.minSize.width) {
         this.framePosition.right = this.wrapperStyle.width - this.framePosition.left - this.minSize.width;
         this.frame.style.right = this.framePosition.right + 'px';
      }
   }

   bottomMove(position) {
      this.frame.style.bottom = (this.wrapperStyle.height - position.y) + 'px';
      this.framePosition.bottom = this.wrapperStyle.height - position.y;
      if (this.framePosition.bottom < this.maxSize.bottom) {
         this.framePosition.bottom = this.maxSize.bottom;
         this.frame.style.bottom = this.framePosition.bottom + 'px';
      }
      if (this.frame.getBoundingClientRect().height < this.minSize.height) {
         this.framePosition.bottom = this.wrapperStyle.height - this.framePosition.top - this.minSize.height;
         this.frame.style.bottom = this.framePosition.bottom + 'px';
      }
   }

   leftMove(position) {
      this.frame.style.left = position.x + 'px';
      this.framePosition.left = position.x;
      if (this.framePosition.left < this.maxSize.left) {
         this.framePosition.left = this.maxSize.left;
         this.frame.style.left = this.framePosition.left + 'px';
      }
      if (this.frame.getBoundingClientRect().width < this.minSize.width) {
         this.framePosition.left = this.wrapperStyle.width - this.framePosition.right - this.minSize.width;
         this.frame.style.left = this.framePosition.left + 'px';
      }
   }

   allMove(position) {
      this.frame.style.bottom = (this.wrapperStyle.height - position.y + this.paddingTop - this.frame.getBoundingClientRect().height) + 'px';
      this.framePosition.bottom = this.wrapperStyle.height - position.y + this.paddingTop - this.frame.getBoundingClientRect().height;
      this.frame.style.top = (position.y - this.paddingTop) + 'px';
      this.framePosition.top = position.y - this.paddingTop;
      this.frame.style.right = (this.wrapperStyle.width - position.x + this.paddingLeft - this.frame.getBoundingClientRect().width) + 'px';
      this.framePosition.right = this.wrapperStyle.width - position.x + this.paddingLeft - this.frame.getBoundingClientRect().width;
      this.frame.style.left = (position.x - this.paddingLeft) + 'px';
      this.framePosition.left = position.x - this.paddingLeft;
      const oldH = this.frame.getBoundingClientRect().height;
      const oldW = this.frame.getBoundingClientRect().width;
      if (this.framePosition.top < this.maxSize.top) {
         this.frame.style.top = this.maxSize.top + 'px';
         this.framePosition.top = this.maxSize.top;
         this.framePosition.bottom = this.wrapperStyle.height - oldH - this.maxSize.top;
         this.frame.style.bottom = this.framePosition.bottom + 'px';
      }
      if (this.framePosition.bottom < this.maxSize.bottom) {
         this.frame.style.bottom = this.maxSize.bottom + 'px';
         this.framePosition.bottom = this.maxSize.bottom;
         this.framePosition.top = this.wrapperStyle.height - oldH - this.maxSize.bottom;
         this.frame.style.top = this.framePosition.top + 'px';
      }
      if (this.framePosition.right < this.maxSize.right) {
         this.frame.style.right = this.maxSize.right + 'px';
         this.framePosition.right = this.maxSize.right;
         this.framePosition.left = this.wrapperStyle.width - oldW - this.maxSize.right;
         this.frame.style.left = this.framePosition.left + 'px';
      }
      if (this.framePosition.left < this.maxSize.left) {
         this.frame.style.left = this.maxSize.left + 'px';
         this.framePosition.left = this.maxSize.left;
         this.framePosition.right = this.wrapperStyle.width - oldW - this.maxSize.left;
         this.frame.style.right = this.framePosition.right + 'px';
      }
   }

   changeSize(e) {
      const point = this.getPositoin(e);
      switch (this.nowContact) {
         case 'top': this.topMove(point); break;
         case 'right': this.rightMove(point); break;
         case 'bottom': this.bottomMove(point); break;
         case 'left': this.leftMove(point); break;
         case 'move': this.allMove(point); break;
      }
   }

   init() {
      this.setMinSize();
      this.frame = document.createElement('div');
      this.setMaxSize();
      this.frame.style = this.getFrameStyle();
      this.frame.addEventListener('mousedown', e => {
         e.stopPropagation();
         const point = this.getPositoin(e);
         this.paddingTop = point.y - this.framePosition.top;
         this.paddingLeft = point.x - this.framePosition.left;
         this.nowContact = 'move';
      });
      const contact = {
         top: {
            sign: 'top',
            x: '50%',
            y: '0',
            style: 'cursor: n-resize;'
         },
         right: {
            sign: 'right',
            x: '100%',
            y: '50%',
            style: 'cursor: e-resize;'
         },
         bottom: {
            sign: 'bottom',
            x: '50%',
            y: '100%',
            style: 'cursor: s-resize;'
         },
         left: {
            sign: 'left',
            x: '0',
            y: '50%',
            style: 'cursor: w-resize;'
         }
      }
      for (let key in contact) {
         this.createContact(this.frame, contact[key]);
      }
      this.wrapper.appendChild(this.frame);
      window.addEventListener('mouseup', e => {
         this.nowContact = null;
         this.paddingTop = null;
         this.paddingLeft = null
      });
   }
}

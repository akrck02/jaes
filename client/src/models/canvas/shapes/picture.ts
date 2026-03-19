class Picture {
  constructor(img, src, sx, sy, sw, sh, x, y, width, height, rotation = 0, name) {
    this.desc = CONST.PICTURE;
    this.name = name || this.desc;
    this.img = img;
    this.src = src;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    //Area to cut from image
    this.sx = sx;
    this.sy = sy;
    this.sw = sw;
    this.sh = sh;

    this.rotation = rotation;
  }
  draw(context, options = { x: 0, y: 0, rotate: 0, scale: 1 }) {
    context.translate(options.x, options.y);
    context.scale(options.scale, options.scale);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }

    let moveX, moveY;
    if (this.rotation > 0) {
      moveX = this.x + this.width / 2;
      moveY = this.y + this.height / 2;
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    //context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
    context.drawImage(this.img, this.x, this.y, this.width, this.height);

    if (this.rotation > 0) {
      context.translate(moveX, moveY);
      context.rotate(-this.rotation);
      context.translate(-moveX, -moveY);
    }

    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(-options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }
    context.scale(1 / options.scale, 1 / options.scale);
    context.translate(-options.x, -options.y);
  }
  drawResized(context, resizeSize = 100, options = { x: 0, y: 0 }) {
    context.translate(options.x, options.y);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }
    context.rotate(this.rotation);
    let resizedWidth;
    let resizedHeight;
    if (this.width > this.height) {
      resizedWidth = resizeSize;
      resizedHeight = (this.height * resizedWidth) / this.width;
    } else {
      resizedHeight = resizeSize;
      resizedWidth = (this.width * resizedHeight) / this.height;
    }
    //context.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.x, this.y, this.width, this.height);
    context.drawImage(this.img, this.x, this.y, resizedWidth, resizedHeight);
    context.rotate(2 * Math.PI - this.rotation);

    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(-options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }
    context.translate(-options.x, -options.y);
  }
  addImgToElem(elem, img) {
    elem.img = img;
    return elem;
  }
}

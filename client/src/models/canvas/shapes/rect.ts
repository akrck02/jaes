import Shape from "./base/shape.js";
import { ShapeTypes } from "./base/constants.js";
import { DrawOptions2D } from "./base/renderable.js";

/**
 * This class represents a Rectangle in 2D space
 */
export default class Rect extends Shape {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    rotation: number,
    name: string
  ) {
    super(name, ShapeTypes.RECT, x, y, width, height, backgroundColor, borderColor, borderWidth, rotation);
  }

  override draw(context: CanvasRenderingContext2D, options: DrawOptions2D) {
    context.translate(options.x, options.y);
    context.scale(options.scale, options.scale);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }

    if (this.rotation > 0) {
      const moveX = this.x + this.width / 2;
      const moveY = this.y + this.height / 2;
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = this.backgroundColor;
    context.fill();
    if (this.borderWidth > 0) {
      context.strokeStyle = this.borderColor;
      context.lineWidth = this.borderWidth;
      context.stroke();
    }

    if (this.rotation > 0) {
      const moveX = this.x + this.width / 2;
      const moveY = this.y + this.height / 2;
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

  override drawResized(context: CanvasRenderingContext2D, resizeSize: number) {
    let scale: number;
    if (this.width >= this.height) {
      scale = resizeSize / context.canvas.width;
    } else {
      scale = resizeSize / context.canvas.height;
    }
    scale = 1;

    context.scale(scale, scale);

    const moveX = this.x + this.width / 2;
    const moveY = this.y + this.height / 2;
    if (this.rotation > 0) {
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    context.fillStyle = this.backgroundColor; //BACKGROUND
    context.fillRect(this.x, this.y, this.width, this.height);

    if (this.borderWidth) {
      context.strokeStyle = this.borderColor;
      context.lineWidth = this.borderWidth;
      context.strokeRect(moveX, moveY, this.width, this.height);
    }

    if (this.rotation > 0) {
      context.translate(moveX, moveY);
      context.rotate(-this.rotation);
      context.translate(-moveX, -moveY);
    }
  }
}

import { ShapeTypes } from "./base/constants.js";
import Shape from "./base/shape.js";
import { DrawOptions2D } from "./base/renderable.js";

/**
 * This class represents an Arc in 2D space
 */
export default class Arc extends Shape {
  radius: number;
  startAngle: number;
  endAngle: number;

  constructor(
    x: number,
    y: number,
    radius: number,
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    startAngle: number = 0,
    endAngle: number = 2 * Math.PI,
    name: string,
    mirror: boolean = false
  ) {
    super(name, ShapeTypes.ARC, x, y, 0, 0, backgroundColor, borderColor, borderWidth, 0, mirror);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }

  draw(context: CanvasRenderingContext2D, options: DrawOptions2D) {
    context.translate(options.x, options.y);
    context.scale(options.scale, options.scale);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }

    if (this.rotation > 0) {
      const moveX = this.x;
      const moveY = this.y;
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    if (this.radius < 0) this.radius *= -1;
    context.beginPath();
    context.fillStyle = this.backgroundColor; //BACKGROUND
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.mirror);
    if (this.borderWidth) {
      context.strokeStyle = this.borderColor; //BORDER
      context.lineWidth = this.borderWidth;
      context.stroke();
    }
    context.fill();

    if (this.rotation > 0) {
      const moveX = this.x;
      const moveY = this.y;
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

  drawResized(context: CanvasRenderingContext2D, resizeSize = 100) {
    const radius = resizeSize / 2;
    if (this.radius < 0) this.radius *= -1;
    context.beginPath();
    context.fillStyle = this.backgroundColor; //BACKGROUND
    context.arc(radius, radius, radius, this.startAngle, this.endAngle);
    if (this.borderWidth > 0) {
      context.strokeStyle = this.borderColor; //BORDER
      context.lineWidth = this.borderWidth;
      context.stroke();
    }

    context.fill();
  }
}

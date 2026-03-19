import { ShapeTypes } from "./base/constants.js";
import Shape from "./base/shape.js";
import { DrawOptions2D } from "./base/renderable.js";

/**
 * this class represents an ellipse in 2D space
 */
export default class Ellipse extends Shape {
  radiusX: number;
  radiusY: number;
  startAngle: number;
  endAngle: number;

  constructor(
    x: number,
    y: number,
    radiusX: number,
    radiusY: number,
    rotation: number = 0,
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    startAngle: number = 0,
    endAngle: number = 2 * Math.PI,
    name: string
  ) {
    super(name, ShapeTypes.ELLIPSE, x, y, 0, 0, backgroundColor, borderColor, borderWidth, rotation);

    this.radiusX = Math.abs(radiusX);
    this.radiusY = Math.abs(radiusY);
    this.startAngle = startAngle;
    this.endAngle = endAngle;
  }

  override draw(context: CanvasRenderingContext2D, options: DrawOptions2D) {
    context.translate(options.x, options.y);
    context.scale(options.scale, options.scale);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }

    context.beginPath();
    context.fillStyle = this.backgroundColor; //BACKGROUND
    context.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
    if (this.borderWidth > 0) {
      context.strokeStyle = this.borderColor; //BORDER
      context.lineWidth = this.borderWidth;
      context.stroke();
    }
    context.fill();

    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(-options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }
    context.scale(1 / options.scale, 1 / options.scale);
    context.translate(-options.x, -options.y);
  }

  override drawResized(context: CanvasRenderingContext2D, resizeSize = 100) {
    let rx: number, ry: number;
    if (this.radiusX >= this.radiusY) {
      rx = resizeSize / 2;
      ry = (this.radiusY * resizeSize) / this.radiusX;
    } else {
      ry = resizeSize / 2;
      rx = (this.radiusX * resizeSize) / this.radiusY;
    }
    context.beginPath();
    context.fillStyle = this.backgroundColor; //BACKGROUND
    context.ellipse(rx, ry, rx, ry, this.rotation, this.startAngle, this.endAngle);
    if (this.borderWidth > 0) {
      context.strokeStyle = this.borderColor; //BORDER
      context.lineWidth = this.borderWidth;
      context.stroke();
    }

    context.fill();
  }
}

import Point2D from "../../point.js";
import { ShapeTypes } from "./base/constants.js";
import Shape from "./base/shape.js";
import { DrawOptions2D } from "./base/renderable.js";

export default class Line extends Shape {
  points: Point2D[];
  constructor(points: Point2D[] = [], borderColor: string = "#ffffff", borderWidth: number = 1, name: string) {
    super(name, ShapeTypes.LINE, 0, 0, 0, 0, undefined, borderColor, borderWidth, 0);
    this.points = points ?? [];
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
    context.strokeStyle = this.borderColor; //BORDER
    context.moveTo(this.points[0].x, this.points[0].y);
    context.lineTo(this.points[1].x, this.points[1].y);
    context.lineWidth = this.borderWidth;
    context.stroke();
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
    let x1: number, x2: number, y1: number, y2: number;
    let maxValue = Math.max(x1, x2, y1, y2);
    x1 = (this.points[0].x * resizeSize) / maxValue;
    x2 = (this.points[1].x * resizeSize) / maxValue;
    y1 = (this.points[0].y * resizeSize) / maxValue;
    y2 = (this.points[1].y * resizeSize) / maxValue;
    context.beginPath();
    context.strokeStyle = this.borderColor; //BORDER
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineWidth = this.borderWidth * 2;
    context.stroke();
    context.fill();
  }
}

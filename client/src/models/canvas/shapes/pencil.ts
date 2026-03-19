import Point2D from "../../point.js";
import { DrawOptions2D } from "./base/renderable.js";
import Shape from "./base/shape.js";
import { ShapeTypes } from "./base/constants.js";

class Pencil extends Shape {
  points: Point2D[];
  color: string;

  constructor(points: Point2D[] = [], color: string, borderWidth: number = 1, name: string) {
    super(name, ShapeTypes.PENCIL, 0, 0, 0, 0, undefined, undefined, borderWidth, 0);
    this.points = points;
    this.color = color;
  }

  override draw(context: CanvasRenderingContext2D, options: DrawOptions2D) {
    context.translate(options.x, options.y);
    context.scale(options.scale, options.scale);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }

    context.strokeStyle = this.color;
    context.beginPath();
    context.moveTo(this.points[0].x, this.points[0].y);
    for (var i = 1; i < this.points.length; i++) {
      context.lineTo(this.points[i].x, this.points[i].y);
    }
    context.lineWidth = this.borderWidth;
    context.stroke();

    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(-options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }
    context.scale(1 / options.scale, 1 / options.scale);
    context.translate(-options.x, -options.y);
  }

  override drawResized(context: CanvasRenderingContext2D, resizeSize = 100) {
    let newPoints = [];
    this.points.forEach((p) => {
      newPoints.push(p.x);
      newPoints.push(p.y);
    });
    let maxValue = Math.max(...newPoints);
    let minValue = Math.min(...newPoints);

    let x = ((this.points[0].x - minValue) * resizeSize) / maxValue;
    let y = ((this.points[0].y - minValue) * resizeSize) / maxValue;
    context.strokeStyle = this.color;
    context.beginPath();
    context.moveTo(x, y);
    for (var i = 1; i < this.points.length; i++) {
      let x = ((this.points[i].x - minValue) * resizeSize) / maxValue;
      let y = ((this.points[i].y - minValue) * resizeSize) / maxValue;
      context.lineTo(x, y);
    }
    context.lineWidth = this.borderWidth * 2;
    context.stroke();
  }
}

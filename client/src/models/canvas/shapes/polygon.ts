import { ShapeTypes } from "./base/constants";
import Shape from "./base/shape";
import Point2D from "../../point.js";
import { DrawOptions2D } from "./base/renderable";

export default class Polygon extends Shape {
  points: Point2D[];

  constructor(points: Point2D[] = [], backgroundColor: string, borderColor: string, borderWidth: number, name: string, rotation: number = 0) {
    super(name, ShapeTypes.POLYGON, 0, 0, 0, 0, backgroundColor, borderColor, borderWidth, rotation);
    this.points = points;
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
      // min x and y in points
      const minX = Math.min(...this.points.map((p) => p.x));
      const minY = Math.min(...this.points.map((p) => p.y));
      // max x and y in points
      const maxX = Math.max(...this.points.map((p) => p.x));
      const maxY = Math.max(...this.points.map((p) => p.y));
      const moveX = minX + (maxX - minX) / 2;
      const moveY = minY + (maxY - minY) / 2;
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    if (this.points.length > 0) {
      context.fillStyle = this.backgroundColor;
      context.beginPath();
      context.moveTo(this.points[0].x, this.points[0].y);
      for (var i = 1; i < this.points.length; i++) {
        context.lineTo(this.points[i].x, this.points[i].y);
      }
      context.lineWidth = this.borderWidth;
      context.closePath();
      context.fill();
      if (this.borderWidth) {
        context.strokeStyle = this.borderColor;
        context.stroke();
      }

      context.fill();
    }

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

  override drawResized(context: CanvasRenderingContext2D, resizeSize: number = 100) {
    let newPoints = [];
    this.points.forEach((p) => {
      newPoints.push(p.x);
      newPoints.push(p.y);
    });
    let maxValue = Math.max(...newPoints);
    let minValue = Math.min(...newPoints);

    let x = ((this.points[0].x - minValue) * resizeSize) / maxValue;
    let y = ((this.points[0].y - minValue) * resizeSize) / maxValue;

    let moveX, moveY;
    if (this.rotation > 0) {
      // min x and y in points
      const minX = Math.min(...this.points.map((p) => p.x));
      const minY = Math.min(...this.points.map((p) => p.y));
      // max x and y in points
      const maxX = Math.max(...this.points.map((p) => p.x));
      const maxY = Math.max(...this.points.map((p) => p.y));
      moveX = minX + (maxX - minX) / 2;
      moveY = minY + (maxY - minY) / 2;
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    context.fillStyle = this.backgroundColor;
    context.strokeStyle = this.borderColor;
    context.beginPath();
    context.moveTo(x, y);
    for (var i = 1; i < this.points.length; i++) {
      let x = ((this.points[i].x - minValue) * resizeSize) / maxValue;
      let y = ((this.points[i].y - minValue) * resizeSize) / maxValue;
      context.lineTo(x, y);
    }
    x = ((this.points[0].x - minValue) * resizeSize) / maxValue;
    y = ((this.points[0].y - minValue) * resizeSize) / maxValue;
    context.lineTo(x, y);
    context.lineWidth = this.borderWidth;
    context.closePath();
    context.fill();
    if (context.lineWidth > 0) {
      context.stroke();
    }

    context.fill();
    if (this.rotation > 0) {
      context.translate(moveX, moveY);
      context.rotate(-this.rotation);
      context.translate(-moveX, -moveY);
    }
    /* // Missing alternative
        const minX = Math.min(...this.points.map(p => p.x));
        const minY = Math.min(...this.points.map(p => p.y));
        const maxX = Math.max(...this.points.map(p => p.x));
        const maxY = Math.max(...this.points.map(p => p.y));
        const range = Math.max(maxX - minX, maxY - minY);
        const scale = resizeSize / range;

        context.save();
        context.scale(scale, scale);
        context.translate(-minX, -minY); // mueve el polígono al origen (0,0)
        this.draw(context, options);
        context.restore();
        */
  }
}

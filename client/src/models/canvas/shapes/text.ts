import Shape from "./base/shape";
import { ALIGNMENT, ShapeTypes } from "./base/constants";
import { DrawOptions2D } from "./base/renderable";

export class Text extends Shape {
  text: string;
  fontSize: number;
  fontFamily: string;
  color: string;

  constructor(
    text: string,
    x: number,
    y: number,
    fontSize: number = 12,
    fontFamily: string = "Helvetica",
    color: string = "#000000",
    width: number,
    rotation: number = 0,
    name: string
  ) {
    super(name, ShapeTypes.TEXT, x, y, width, 0, undefined, undefined, 0, rotation);
    this.text = text;
    this.fontSize = fontSize;
    this.fontFamily = fontFamily;
    this.color = color;
  }

  draw(context: CanvasRenderingContext2D, options: DrawOptions2D) {
    context.translate(options.x, options.y);
    context.scale(options.scale, options.scale);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }

    let moveX: number, moveY: number;
    if (this.rotation > 0) {
      moveX = this.x + this.width / 2;
      moveY = this.y + this.fontSize / 2;
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    context.font = `${this.fontSize}px ${this.fontFamily}`;
    context.textAlign = this.textAlign ?? ALIGNMENT.START;
    context.fillStyle = this.color;
    context.fillText(this.text, this.x + options.x, this.y + options.y, this.width);

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
}

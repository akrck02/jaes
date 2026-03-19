import { DrawOptions2D, Renderable } from "./renderable.js";
import Shape from "./shape.js";

/**
 * This class represents a layer in 2D space.
 */
export default class Layer implements Renderable {
  name: string;
  desc: string;
  shapes: Shape[];
  visible: boolean;

  constructor(name: string, shapes: Shape[] = []) {
    this.shapes = shapes;
    this.name = name;
    this.desc = "desc";
    this.visible = true;
  }

  draw(context: CanvasRenderingContext2D, options: DrawOptions2D) {
    if (this.visible) {
      this.shapes.forEach((shape) => {
        shape.draw(context, options);
      });
    }
  }

  drawResized(context: CanvasRenderingContext2D, scale: number, options: DrawOptions2D) {
    if (this.visible) {
      this.shapes.forEach((shape) => {
        shape.drawResized(context, scale, options);
      });
    }
  }
}

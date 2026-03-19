import { ShapeTypes } from "./constants";
import { DrawOptions2D, Renderable } from "./renderable";

/**
 * Base object represented in 2D space
 */
export default abstract class Shape implements Renderable {
  name: string;
  desc: ShapeTypes;
  x: number;
  y: number;
  width: number;
  height: number;
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  rotation: number;
  mirror: boolean;

  constructor(
    name: string,
    desc: ShapeTypes,
    x: number,
    y: number,
    width: number,
    height: number,
    backgroundColor: string,
    borderColor: string,
    borderWidth: number,
    rotation: number,
    mirror: boolean = false
  ) {
    this.desc = desc;
    this.name = name ?? this.desc;
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.width = width ?? 0;
    this.height = height ?? 0;
    this.backgroundColor = backgroundColor;
    this.borderColor = borderColor;
    this.borderWidth = borderWidth ?? 0;
    this.rotation = rotation ?? 0;
    this.mirror = mirror ?? false;
  }

  abstract draw(context: CanvasRenderingContext2D, options: DrawOptions2D): void;
  abstract drawResized(context: CanvasRenderingContext2D, resizeSize: number, options: DrawOptions2D): void;
}

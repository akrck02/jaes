export interface Renderable {
  /**
   * Draw the object in 2D given some options
   * @param context the canvas rendering context in 2D space
   * @param options the rendering options
   */
  draw(context: CanvasRenderingContext2D, options: DrawOptions2D): void;

  /**
   * Draw the object in 2D resized given a size
   * @param context the canvas rendering context in 2D space
   * @param resizeSize the rendering options
   * @param options the rendering options
   */
  drawResized(context: CanvasRenderingContext2D, resizeSize: number, options: DrawOptions2D): void;
}

/**
 * This type represents the options needed to draw an object2D
 */
export type DrawOptions2D = {
  x: 0;
  y: 0;
  rotate: 0;
  scale: 1;
  rotationCenter: {
    x: 0;
    y: 0;
  };
};

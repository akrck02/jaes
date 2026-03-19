class ProjectShape {
  constructor(projectId, layers = [], width, height, name, rotation = 0) {
    this.projectId = projectId;
    this.layers = Array.isArray(layers) ? layers : [];
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.desc = CONST.PROJECT_SHAPE;
    this.name = name || this.desc;
    this.points = [];
  }
  add(point) {
    if (this.points.filter((p) => p.x === point.x && p.y === point.y).length === 0) {
      this.points.push(point);
    }
  }
  remove(point) {
    this.points = this.points.filter((p) => p.x !== point.x || p.y !== point.y);
  }
  draw(context, options = { x: 0, y: 0, rotate: 0, scale: 1 }) {
    context.translate(options.x, options.y);

    this.points.forEach((p) => {
      this.layers.forEach((layer) => {
        layer.draw(context, {
          x: p.x,
          y: p.y,
          rotate: this.rotation,
          rotationCenter: {
            x: this.width / 2,
            y: this.height / 2
          },
          scale: options.scale
        });
      });
    });

    context.translate(-options.x, -options.y);
  }
  drawResized(context, resizeSize = 100, options = { x: 0, y: 0 }) {
    context.translate(options.x, options.y);

    this.points.forEach((p) => {
      this.layers.forEach((layer) => {
        layer.drawResized(context, resizeSize, {
          x: p.x,
          y: p.y,
          rotate: this.rotation,
          rotationCenter: {
            x: this.width / 2,
            y: this.height / 2
          }
        });
      });
    });

    context.translate(-options.x, -options.y);
  }
}

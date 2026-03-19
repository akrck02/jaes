class Rubber {
  constructor(points, borderWidth = 0, name, rotation = 0) {
    this.desc = CONST.RUBBER;
    this.name = name || this.desc;
    if (points !== undefined) {
      this.points = points;
    } else {
      this.points = [];
    }
    this.borderWidth = parseInt(borderWidth);

    this.rotation = rotation;
  }
  draw(context, options = { x: 0, y: 0 }) {
    context.translate(options.x, options.y);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }

    let moveX, moveY;
    if (this.rotation > 0) {
      // min x and y in points
      const minX = Math.min(...this.points.map((p) => p.x));
      const minY = Math.min(...this.points.map((p) => p.y));
      // max x and y in points
      const maxX = Math.max(...this.points.map((p) => p.x)) + this.borderWidth;
      const maxY = Math.max(...this.points.map((p) => p.y)) + this.borderWidth;
      moveX = minX + (maxX - minX) / 2;
      moveY = minY + (maxY - minY) / 2;
      context.translate(moveX, moveY);
      context.rotate(this.rotation);
      context.translate(-moveX, -moveY);
    }

    for (var i = 0; i < this.points.length - 1; i++) {
      context.clearRect(this.points[i].x - this.borderWidth / 2, this.points[i].y - this.borderWidth / 2, this.borderWidth / 2, this.borderWidth / 2);
    }
    context.stroke();

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
    context.translate(-options.x, -options.y);
  }
  drawResized(context, resizeSize = 100, options = { x: 0, y: 0, rotate: 0, scale: 1 }) {
    context.translate(options.x, options.y);
    context.scale(options.scale, options.scale);
    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }
    let newPoints = [];
    this.points.forEach((p) => {
      newPoints.push(p.x);
      newPoints.push(p.y);
    });
    let maxValue = Math.max(...newPoints);
    let minValue = Math.min(...newPoints);

    let x = ((this.points[0].x - minValue) * resizeSize) / maxValue;
    let y = ((this.points[0].y - minValue) * resizeSize) / maxValue;
    context.strokeStyle = "#000000";
    context.beginPath();
    context.moveTo(x, y);
    for (var i = 1; i < this.points.length; i++) {
      let x = ((this.points[i].x - minValue) * resizeSize) / maxValue;
      let y = ((this.points[i].y - minValue) * resizeSize) / maxValue;
      context.lineTo(x, y);
    }
    context.lineWidth = this.borderWidth * 2;
    context.stroke();

    if (options.rotationCenter && options.rotate) {
      context.translate(options.rotationCenter.x, options.rotationCenter.y);
      context.rotate(-options.rotate);
      context.translate(-options.rotationCenter.x, -options.rotationCenter.y);
    }
    context.scale(1 / options.scale, 1 / options.scale);
    context.translate(-options.x, -options.y);
  }
}

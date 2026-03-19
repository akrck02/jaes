class MasterJasonFile {
  canvas: (cnvW: any, cnvH: any) => void;

  constructor(cnvW, cnvH, bgc, gridH, gridV, layers) {
    this.canvas = function (cnvW, cnvH) {
      this.width = cnvW;
      this.height = cnvH;
    };
    this.canvas.width = cnvW;
    this.canvas.height = cnvH;

    this.bgc = bgc;

    this.grid = function (gridH, gridV) {
      this.height = gridH;
      this.v = gridV;
    };
    this.grid.height = gridH;
    this.grid.v = gridV;
    this.layers = layers;
  }
}

class ClickXY {
  constructor(data = { x: 0, y: 0 }, round = { x: 1, y: 1 }) {
    const roundX = round.x || 1;
    const roundY = round.y || 1;
    this.x = Math.round(data.x / roundX) * roundX;
    this.y = Math.round(data.y / roundY) * roundY;
  }
  getSimple() {
    return {
      x: this.x,
      y: this.y
    };
  }
}

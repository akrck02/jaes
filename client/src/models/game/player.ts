import ShipsManager from "./ships.manager.js";

export default class Player {
  shipsManager: ShipsManager;
  name: string;
  shipId: any;
  ship: any;
  credits: number;
  layers: any;
  x: number;
  y: number;
  nameShape: any;
  width: number;
  height: number;
  rotate: number;
  bullets: any;
  life: number;
  deaths: number;
  kills: number;
  speed: number;
  hide: boolean;
  isDead: boolean;
  scale: number;
  picture: any;

  constructor(shipsManager: ShipsManager, username: string, shipId: number, x = 0, y = 0, credits: number) {
    this.shipsManager = shipsManager;
    this.name = username;
    this.shipId = shipId;
    this.ship = shipsManager.getShipById(shipId);
    this.credits = credits || 0;
    this.layers = parseLayers(this.ship.layers);
    this.x = x;
    this.y = y;
    this.nameShape = new Text(this.name, this.x, this.y - 10, 30, "Helvetica", "#ffffff");
    this.width = this.ship.width;
    this.height = this.ship.height;
    this.rotate = 0;
    this.bullets = [];
    this.life = 10;
    this.deaths = 0;
    this.kills = 0;
    this.speed = 0;
    this.hide = false;
    this.isDead = false;
    this.scale = 1;
    const debugEnabled = typeof localStorage !== "undefined" && localStorage.getItem("debug");
    if (debugEnabled) {
      console.log(`Player ${this.name} created with ship ${this.ship.name}`);
      console.log(this.ship);
    }
    this.picture = null;
    this.calculateScale();
  }

  draw_old(context) {
    if (this.hide) return;
    const rotationCenter = { x: this.ship.width / 2, y: this.ship.height / 2 };
    const layerOptions = {
      x: this.x + this.xTranslation,
      y: this.y + this.yTranslation,
      rotate: this.rotate,
      rotationCenter,
      scale: this.scale
    };

    for (const layer of this.layers) {
      layer.draw(context, layerOptions);
    }
    this.nameShape.x = layerOptions.x;
    this.nameShape.y = layerOptions.y - 20;
    this.nameShape.draw(context, { x: 0, y: 0 });
  }
  /**
   * Draws the player's ship on the canvas. If the ship is hidden, it returns without drawing. It calculates the real dimensions of the ship based on its scale and translation, and then calls drawPicture to render the ship using a pre-rendered picture for optimized performance. Finally, it draws the player's name above the ship.
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    if (this.hide) return;
    const realDimension = this.getRealDimension();
    const rotationCenter = {
      x: realDimension.width / 2,
      y: realDimension.height / 2
    };
    const layerOptions = {
      x: realDimension.x,
      y: realDimension.y,
      rotate: this.rotate,
      rotationCenter,
      scale: 1
    };

    this.drawPicture(context, layerOptions);

    this.nameShape.x = layerOptions.x;
    this.nameShape.y = layerOptions.y - 20;
    this.nameShape.draw(context, { x: 0, y: 0 });
  }
  /**
   * Draws the player's ship using vector graphics. This method is less optimized than drawPicture and is intended for drawing an unrotated ship at the origin using vector layers (e.g. for pre-rendering). It supports scaling via this.scale but always uses a rotation value of 0. It iterates through each layer of the ship and draws it according to these options.
   * @param {CanvasRenderingContext2D} context
   */
  drawVectorial(context) {
    if (this.hide) return;
    const rotationCenter = { x: this.ship.width / 2, y: this.ship.height / 2 };
    const layerOptions = {
      x: 0,
      y: 0,
      rotate: 0,
      rotationCenter,
      scale: this.scale
    };

    for (const layer of this.layers) {
      layer.draw(context, layerOptions);
    }
    //this.nameShape.x = layerOptions.x;
    //this.nameShape.y = layerOptions.y - 20;
    //this.nameShape.draw(context, { x: 0, y: 0 });
  }
  /**
   * Draws the player's ship using a pre-rendered picture for optimized performance. If the picture is not yet rendered, it calls the render method to create it before drawing.
   * @param {CanvasRenderingContext2D} context
   * @param {*} layerOptions
   */
  drawPicture(context, layerOptions) {
    if (this.hide) return;
    if (!this.picture) {
      this.render();
    }
    this.picture.draw(context, layerOptions);
  }
  /**
   * Renders the player's ship into a picture for optimized drawing. This is called whenever the player's scale changes, to ensure the picture is up to date with the current size.
   */
  render() {
    if (!this.pictureCanvas) {
      this.pictureCanvas = document.createElement("canvas");
    }
    const realDimension = this.getRealDimension();
    const roundedWidth = Math.ceil(realDimension.width);
    const roundedHeight = Math.ceil(realDimension.height);
    this.pictureCanvas.width = roundedWidth;
    this.pictureCanvas.height = roundedHeight;
    // reset canvas
    const offscreenCanvas = this.pictureCanvas;
    const offscreenContext = offscreenCanvas.getContext("2d");
    offscreenContext.clearRect(0, 0, offscreenCanvas.width, offscreenCanvas.height);
    this.drawVectorial(offscreenContext);
    this.picture = new Picture(offscreenCanvas, null, 0, 0, roundedWidth, roundedHeight, 0, 0, roundedWidth, roundedHeight);
  }
  /**
   * Calculates the scale of the player's ship based on a standard size and the player's kills and deaths. It adjusts the real width and height of the ship accordingly, as well as the translation needed to keep the ship centered. Finally, it calls render to update the picture with the new scale.
   * @param {number} sizeStandard
   */
  calculateScale(sizeStandard = 100) {
    let scaleDec = 1;
    if (sizeStandard) {
      const baseSize = Math.max(this.width, this.height) || 1;
      const minSize = 10;
      const newSize = sizeStandard + (this.kills - this.deaths) * 10;
      const clampedSize = Math.max(minSize, newSize);
      scaleDec = clampedSize / baseSize;
    }

    this.realWidth = this.width * scaleDec;
    this.realHeight = this.height * scaleDec;

    this.xTranslation = (this.width - this.realWidth) / 2;
    this.yTranslation = (this.height - this.realHeight) / 2;
    this.scale = scaleDec;
    this.render();
  }
  /**
   * Returns the real dimensions of the player's ship, including the x and y position adjusted for translation, and the real width and height based on the current scale.
   * @returns {Object} An object containing the real dimensions of the player's ship, including the x and y position adjusted for translation, and the real width and height based on the current scale. This is used for accurate collision detection and drawing calculations.
   */
  getRealDimension() {
    return {
      x: this.x + this.xTranslation,
      y: this.y + this.yTranslation,
      width: this.realWidth,
      height: this.realHeight
    };
  }
  /**
   * Creates a new bullet object based on the player's current position, rotation, and speed. The bullet is initialized with the player's socket ID, starting position at the center of the ship, angle of rotation, and speed. The bullet is then added to the player's bullets array and returned for further processing (such as adding to the game world or sending to the server).
   */
  createBullet() {
    const realDimension = this.getRealDimension();
    let bPosX = realDimension.x + realDimension.width / 2;
    let bPosY = realDimension.y + realDimension.height / 2;
    const bullet = new Bullet(this.socketId, bPosX, bPosY, this.rotate, this.speed, this.rotate);
    this.bullets.push(bullet);
    return bullet;
  }

  dead() {
    this.isDead = true;
    this.speed = 0;
  }

  getSortDetails() {
    return {
      x: this.x,
      y: this.y,
      name: this.name,
      credits: this.credits,
      rotate: this.rotate,
      life: this.life,
      kills: this.kills,
      deaths: this.deaths,
      shipId: this.shipId,
      hide: this.hide,
      isDead: this.isDead,
      scale: this.scale,
      xTranslation: this.xTranslation,
      yTranslation: this.yTranslation
    };
  }

  getDistanceToPlayer(player) {
    const xLength = this.x - player.x;
    const yLength = this.y - player.y;
    return Math.sqrt(Math.pow(xLength, 2) + Math.pow(yLength, 2));
  }

  getCenteredPosition() {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  }
}

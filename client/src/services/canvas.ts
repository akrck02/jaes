export default class Canvas {
  static parseLayers(layers) {
    const parsedLayers = [];
    layers.forEach((layer) => {
      parsedLayers.push(parseLayer(layer));
    });
    return parsedLayers;
  }

  static parseLayer(layer) {
    const newLayer = new CanvasClasses.Layer(layer.name);
    layer.shapes.forEach((shape) => {
      newLayer.shapes.push(parseShape(shape));
    });
    return newLayer;
  }

  static parseShape(shape) {
    const newShape = new CanvasClasses[shape.desc]();
    for (const prop in shape) newShape[prop] = shape[prop];

    if (CONST.PICTURE === newShape.desc) {
      const img = new Image();
      img.src = newShape.src;
      newShape.img = img;
    } else if (CONST.PROJECT_SHAPE === newShape.desc) {
      newShape.layers = parseLayers(newShape.layers);
    }
    return newShape;
  }
}

export default class ShipsManager {
  ships: Ship[];
  shipsById: { [id: number]: Ship };

  constructor(ships: Ship[]) {
    this.ships = ships;
    this.shipsById = {};
    ships.forEach((ship) => {
      this.shipsById[ship._id] = ship;

      if (ship.canvas) {
        ship.width = ship.canvas.width;
        ship.height = ship.canvas.height;
      }
    });
  }

  getShips() {
    return this.ships;
  }

  getShipById(shipId: number) {
    return this.shipsById[shipId];
  }

  getGenericShips() {
    return this.ships.filter((s) => !s.userId);
  }
}

export default class GamePreload {
  static async start() {
    const gameData = await (await fetch("/game/data")).json();

    this.username = gameData.username;

    if (gameData.guestsAllowed && !gameData.username) {
      guest = true;
      _username =
        location.host.indexOf("3000") >= 0
          ? "jonbul"
          : prompt("Username:", "Username");
      if (!_username) {
        _username = "Noname " + parseInt(Date.now() / 1000);
      }
    }
  }
}

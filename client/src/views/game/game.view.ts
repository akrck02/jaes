import { preloadGame } from "../../services/game/game.preload.js";
import Templates from "../../services/templates.js";

export default class GameView {
  static async show(_: string[], wrapper: HTMLElement) {
    wrapper.innerHTML = await Templates.getHTML("/views/canvas/game.html");

    await preloadGame();
  }
}

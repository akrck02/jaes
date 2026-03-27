import Layout from "./components/layout.js";
import { setNotFoundRoute, setRoutes, showRoute } from "./lib/router.js";
import Templates from "./services/templates.js";
import GameView from "./views/game/game.view.js";

type RouteLoader = (params: string[], wrapper: HTMLElement) => Promise<void>;

/**.
 * When the dynamic URL changes loads
 * the correspoding view from the URL
 */
window.addEventListener("hashchange", start);

/**
 * When the window is loaded load
 * the app state to show
 */
window.onload = async function () {
  // Set routes
  setRoutes({
    "": template("views/home.html"),
    "/game": GameView.show
  });

  setNotFoundRoute(template("views/not.found.html"));

  document.body.appendChild(Layout.instance());
  await start();
};

/**
 * Returns a route loader for the static template
 * @param url the url to load
 * @returns a function to load the static template
 */
function template(url: string): RouteLoader {
  return async (_: string[], wrapper: HTMLElement) => Templates.load(url, wrapper);
}

/** Start the web app     */
async function start() {
  showRoute(window.location.hash.slice(1).toLowerCase(), Layout.getWrapper());
}

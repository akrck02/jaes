import { uiComponent } from "../lib/dom.js";
import NavBar from "./navbar.js";

export default class Layout {
  private static element: HTMLElement;
  private static wrapper: HTMLElement;

  static instance(): HTMLElement {
    if (Layout.element) return Layout.element;

    Layout.element = uiComponent({});

    Layout.element.appendChild(NavBar.instance());
    const titleStr = undefined;
    document.title = titleStr || "JA7∫åES";

    Layout.wrapper = uiComponent({
      id: "wrapper"
    });
    Layout.element.appendChild(Layout.wrapper);
    return Layout.element;
  }

  static setFullscreen() {
    NavBar.instance().classList.toggle("Hidden");
  }

  static getWrapper() {
    return Layout.wrapper;
  }
}

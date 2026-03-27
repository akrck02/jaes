import { uiComponent } from "../lib/dom.js";
import { Html } from "../lib/html.js";

export default class NavBar {
  private static element: HTMLElement;

  static init() {}

  static instance(): HTMLElement {
    if (NavBar.element) return this.element;

    NavBar.element = uiComponent({
      type: Html.Nav,
      id: "mainNavbar"
    });

    const brand = uiComponent({
      type: Html.A,
      classes: ["mainNavbar-brand"],
      text: "JAES",
      attributes: {
        href: "/#/"
      }
    });
    NavBar.element.appendChild(brand);

    const button = uiComponent({
      type: Html.Button,
      classes: ["navbar-button"],
      text: "&#9776;",
      data: {
        toggle: "collapse",
        target: "#navbarNav"
      },
      attributes: {
        "aria-controlls": "navbarNav",
        "aria-expanded": "false",
        "aria-label": "Toggle navigation"
      }
    });
    NavBar.element.appendChild(button);

    const leftMenu = uiComponent({
      type: Html.Ul,
      classes: ["navbarMenu", "collapsable"]
    });

    leftMenu.appendChild(this.createNavItem("Home", "/#/"));
    leftMenu.appendChild(this.createNavItem("Game", "/#/game"));

    const username = false;
    const isAdmin = false;
    if (username) {
      leftMenu.appendChild(
        this.createNavItem("Painting Projects", "/#/editor")
      );

      if (isAdmin) {
        leftMenu.appendChild(this.createNavItem("Game Status", "/#/status"));
        leftMenu.appendChild(
          this.createNavItem("Administrator Panel", "/#/admin")
        );
      }
    }

    button.onclick = () => leftMenu.toggleAttribute("collapsed-expanded");
    NavBar.element.appendChild(leftMenu);

    const rightMenu = uiComponent({
      type: Html.Ul,
      id: "navbarMenuRight",
      classes: ["navbarMenu"]
    });

    if (!username) {
      rightMenu.appendChild(this.createNavItem("Login", "/#/login"));
      rightMenu.appendChild(this.createNavItem("Register", "/#/register"));
    } else {
      rightMenu.appendChild(this.createNavItem("Profile", "/#/profile"));
      rightMenu.appendChild(this.createNavItem("Logout", "/#/logout"));
    }

    NavBar.element.appendChild(rightMenu);
    return NavBar.element;
  }

  private static createNavItem(name: string, url: string): HTMLElement {
    const li = uiComponent({
      type: Html.Li,
      classes: ["nav-item"]
    });

    const a = uiComponent({
      type: Html.A,
      text: name,
      classes: ["nav-link"],
      attributes: {
        href: url
      }
    });
    li.appendChild(a);

    return li;
  }
}

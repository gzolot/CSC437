import { LitElement, css, html } from "lit";
import {  Dropdown, define, Events, View, Auth, Observer } from "@calpoly/mustang";
import resetCSS from "../css/reset";
import { property, state } from "lit/decorators.js";
import { UserProfile } from "server/models";
import { Model } from "../model";
import { Msg } from "../messages";

export class HeaderElement extends LitElement {
    static uses = define({
        "drop-down": Dropdown.Element
        });

        @state()
        username = "anonymous";

        @state()
        user: Auth.Model["user"] | null = null;

  constructor() {
    super();
    this._authObserver = new Observer<Auth.Model>(this, "blazing:auth");
  }

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe(({ user }) => {
      if (user && user.username !== this.username) {
        this.username = user.username;
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  render() {
    return html`
      <header>
      <h1>Welcome to Your Fitness Journey</h1>
      <p>Discover the skills to elevate your physical capabilities. Choose your path: Balance, Strength, or Mobility.</p>
      <div class = "dark-mode-toggle">
      <drop-down>
      <label @change=${toggleDarkMode}>
    <input type="checkbox" autocomplete="off" />
    Dark mode
    </label>
      <!-- add link to another page below label -->
      <a href="/app/profile/${this.username}">Profile</a>
      <a href="/login.html">Login</a>
      </drop-down>
      </div>
    </header>
    `;
  }

  static styles = [
    resetCSS,
    css`
  header{
    display: grid;
    line-height: 1.5;
}
header{
    background: var(--primary-background);
    color: var(--header-text);
    padding: 20px 40px;
    box-shadow: 0 2px 4px var(--header-text);
    font-family: var(--primary-font-family);

}
header p {
    color: var(--text-primary)
}
  `
    ];

    _authObserver: Observer<Auth.Model>;
}

type Checkbox = HTMLInputElement & { checked: boolean };

function toggleDarkMode(ev: InputEvent) {
    const target = ev.target as Checkbox;
    const checked = target.checked;
  
    // Events.relay(ev, "dark-mode", { checked });

    document.body.classList.toggle("dark-mode", checked);
  }
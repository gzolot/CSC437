import { prepareTemplate } from "./template.js";

export class DropdownElement extends HTMLElement {
  static template = prepareTemplate(`<template>
  <slot name="actuator">
      <button class="menu-button">Menu</button>
  </slot>
  <div id="panel">
    <slot></slot>
  </div>
  
  <style>
    :host {
      position: relative;
      font-family: var(--primary-font-family); /* Ensures consistent font usage */
    }

    .menu-button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px; /* Simple and effective border radius */
      background-color: var(--button-background); /* Using the button background color */
      color: var(--text-on-primary); /* Text color on primary button background */
      font-size: 16px;
      cursor: pointer;
      transition: background-color 0.3s, box-shadow 0.3s;
    }

    .menu-button:hover, .menu-button:focus {
      background-color: var(--primary-hover); /* Darker blue on hover/focus */
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
      outline: none; /* Removes focus outline */
    }

    #panel {
      display: none;
      position: absolute;
      right: 0;
      margin-top: 3px; /* Small margin from the button */
      width: max-content; /* Width auto to adjust based on content */
      max-width: 200px; /* Maximum width to keep the dropdown compact */
      padding: 1px; /* Reduced padding */
      border-radius: 8px; /* Rounded corners */
      background: var(--section-background); /* Using section background for the dropdown */
      color: var(--text-primary); /* Text color for readability */
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
      z-index: 1000; /* Ensures the dropdown appears over other content */
    }

    :host([open]) #panel {
      display: block;
    }
  </style>
</template>`);

  constructor() {
    super();

    this.attachShadow({ mode: "open" }).appendChild(
      DropdownElement.template.cloneNode(true)
    );
    this.shadowRoot
      .querySelector("slot[name='actuator']")
      .addEventListener("click", () => this.toggle());
  }

  toggle() {
    if (this.hasAttribute("open")) this.removeAttribute("open");
    else this.setAttribute("open", "open");
  }
}

customElements.define("drop-down", DropdownElement);

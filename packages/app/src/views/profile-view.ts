
import {
    define,
    Form,
    History,
    InputArray,
    View
  } from "@calpoly/mustang";
  import { css, html, LitElement } from "lit";
  import { property, state } from "lit/decorators.js";
  import { UserProfile } from "server/models";
  import resetStyles from "../css/reset";
  import { Msg } from "../messages";
  import { Model } from "../model";
  
  const gridStyles = css`
    slot[name="avatar"] {
      display: block;
      grid-row: 1 / span 4;
    }
    nav {
      display: contents;
      text-align: right;
    }
    nav > * {
      grid-column: controls;
    }
  `;
  
  class ProfileViewer extends LitElement {
    @property()
    username?: string;
  
    render() {
      return html`
        <section>
          <h1><slot name="name"></slot></h1>
          <nav>
            <a href="${this.username}/edit" class="edit">Edit</a>
          </nav>
          <dl>
            <dt>Username</dt>
            <dd><slot name="userId"></slot></dd>
            <dd><slot name="username"></slot></dd>
            <dd><slot name="email"></slot></dd>
          </dl>
        </section>
      `;
    }
  
    static styles = [
      resetStyles,
      gridStyles,
      css`
        * {
          margin: 0;
          box-sizing: border-box;
        }
        section {
          display: grid;
          grid-template-columns: [key] 1fr [value] 3fr [controls] 1fr [end];
          gap: var(--size-spacing-medium)
            var(--size-spacing-xlarge);
          align-items: end;
        }
        h1 {
          grid-row: 4;
          grid-column: value;
        }
        dl {
          display: grid;
          grid-column: key / end;
          grid-template-columns: subgrid;
          gap: 0 var(--size-spacing-xlarge);
          align-items: baseline;
        }
        dt {
          grid-column: key;
          justify-self: end;
          color: var(--color-accent);
          font-family: var(--font-family-display);
        }
        dd {
          grid-column: value;
        }
        ::slotted(ul) {
          list-style: none;
          display: flex;
          gap: var(--size-spacing-medium);
        }
      `
    ];
  }
  
  class ProfileEditor extends LitElement {
    static uses = define({
      "mu-form": Form.Element,
      "input-array": InputArray.Element
    });
    @property()
    username?: string;
  
    @property({ attribute: false })
    init?: UserProfile;
  
    render() {
      return html`
        <section>
          <h1><slot name="name"></slot></h1>
          <nav>
            <a class="close" href="../${this.username}">Close</a>
            <button class="delete">Delete</button>
          </nav>
          <mu-form .init=${this.init}>
            <label>
              <span>Username</span>
              <input disabled name="userId" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" />
            </label>
            <label>
              <span>Name</span>
              <input name="name" />
            </label>
          </mu-form>
        </section>
      `;
    }
  
    static styles = [
      resetStyles,
      gridStyles,
      css`
        mu-form {
          grid-column: key / end;
        }
        mu-form input {
          grid-column: input;
        }
        mu-form label:has(input[type="file"]) {
          grid-row-end: span 4;
        }
      `
    ];
  
    _handleAvatarSelected(ev: Event) {
      const target = ev.target as HTMLInputElement;
      const selectedFile = (target.files as FileList)[0];
  
      const reader: Promise<string> = new Promise(
        (resolve, reject) => {
          const fr = new FileReader();
          fr.onload = () => resolve(fr.result as string);
          fr.onerror = (err) => reject(err);
          fr.readAsDataURL(selectedFile);
        }
      );
  
      reader.then((url: string) => {
        this.dispatchEvent(
          new CustomEvent("profile:new-avatar", {
            bubbles: true,
            composed: true,
            detail: url
          })
        );
      });
    }
  }
  
  export class ProfileViewElement extends View<Model, Msg> {
    static uses = define({
      "profile-viewer": ProfileViewer,
      "profile-editor": ProfileEditor
    });
  
    @property({ type: Boolean, reflect: true })
    edit = false;
  
    @property({ attribute: "user-id", reflect: true })
    userid = "";
  
    @state()
    get profile(): UserProfile | undefined {
      return this.model.UserProfile;
    }
  
    @state()
    newAvatar?: string;
  
    constructor() {
      super("blazing:model");
  
      this.addEventListener(
        "profile:new-avatar",
        (event: Event) => {
          this.newAvatar = (event as CustomEvent)
            .detail as string;
        }
      );
    }
  
    attributeChangedCallback(
      name: string,
      oldValue: string,
      newValue: string
    ) {
      super.attributeChangedCallback(name, oldValue, newValue);
      if (
        name === "user-id" &&
        oldValue !== newValue &&
        newValue
      ) {
        console.log("Profiler Page:", newValue);
        this.dispatchMessage([
          "profile/select",
          { userid: newValue }
        ]);
      }
    }
  
    render() {
      const {
        userId,
        username,
        email
      } = this.profile || {};
      console.log("Profile:", this.profile);
      console.log(userId, username, email);
      return this.edit
        ? html`
            <profile-editor
              username=${userId}
              .init=${this.profile}
              @mu-form:submit=${(
          event: Form.SubmitEvent<UserProfile>
        ) => this._handleSubmit(event)}>
              ${userId}
            </profile-editor>
          `
        : html`
            <profile-viewer username=${userId}>
              ${userId}
              <span slot="userId">${userId}</span>
              <span slot="username">${username}</span>
              <span slot="email">${email}</span>
            </profile-viewer>
          `;
    }
  
    _handleSubmit(event: Form.SubmitEvent<UserProfile>) {
      console.log("Handling submit of mu-form");
      const profile = this.newAvatar
        ? { ...event.detail, avatar: this.newAvatar }
        : event.detail;
    this.dispatchMessage([
        "profile/save",
        {
            userid: this.userid,
            profile,
            onSuccess: () =>
                History.dispatch(this, "history/navigate", {
                    href: `/app/profile/${this.userid}`
                }),
            onFailure: (error: Error) =>
                console.log("ERROR:", error)
        } as { userid: string; profile: UserProfile; onSuccess: () => void; onFailure: (error: Error) => void }
    ]);
    }
  
    static styles = [resetStyles];
  }
  
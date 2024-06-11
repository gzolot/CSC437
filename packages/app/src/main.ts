import { Auth, Store, define , History, Switch} from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model, init } from "./model";
import update from "./update";
import { HeaderElement } from "./components/blazing-header";
import { html } from "lit";
import { ProfileViewElement } from "./views/profile-view";

const routes:Switch.Route[] = [
    {
        auth: "protected",
        path: "/app/profile/:id/edit",
        view: (params: Switch.Params) => html`
          <profile-view edit user-id=${params.id}></profile-view>
        `
    },
    {
      auth: "protected",
      path: "/app/profile/:id",
      view: (params: Switch.Params) => html`
        <profile-view user-id=${params.id}></profile-view>
      `
    },
    {
      path: "/app",
      view: () => html`
        <landing-view></landing-view>
      `
    },
    {
      path: "/",
      redirect: "/app"
    }
  ];

define({
  "mu-auth": Auth.Provider,
  "mu-store": class AppStore extends Store.Provider<
    Model,
    Msg
  > {
    constructor() {
      super(update, init, "blazing:auth");
    }
  },
  "mu-history": History.Provider,
  "mu-switch": class AppSwitch extends Switch.Element {
    constructor() {
      super(routes, "blazing:history", "blazing:auth");
    }
  },
  "workout-header": HeaderElement,
    "profile-view": ProfileViewElement
});
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var profiles_exports = {};
__export(profiles_exports, {
  default: () => profiles_default
});
module.exports = __toCommonJS(profiles_exports);
var import_express = __toESM(require("express"));
var import_UserProfileService = __toESM(require("../services/UserProfileService"));
const router = import_express.default.Router();
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  console.log("Fetching user with ID:", userId);
  import_UserProfileService.default.get(userId).then((profile) => res.json(profile)).catch((err) => res.status(404).end());
});
router.post("/", (req, res) => {
  const newProfile = req.body;
  console.log("Creating new user profile with data:", newProfile);
  import_UserProfileService.default.create(newProfile).then((profile) => res.status(201).send(profile)).catch((err) => res.status(500).send(err));
});
router.get("/", (req, res) => {
  import_UserProfileService.default.index().then((list) => res.json(list)).catch((err) => res.status(500).send(err));
});
router.put("/:userId", (req, res) => {
  const { userId } = req.params;
  console.log("Updating user with ID:", userId);
  const newProfile = req.body;
  import_UserProfileService.default.update(userId, newProfile).then((profile) => res.json(profile)).catch((err) => res.status(404).end());
});
var profiles_default = router;

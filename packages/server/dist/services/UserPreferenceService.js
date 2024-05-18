"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var UserPreferenceService_exports = {};
__export(UserPreferenceService_exports, {
  default: () => UserPreferenceService_default,
  getUserPreferences: () => getUserPreferences
});
module.exports = __toCommonJS(UserPreferenceService_exports);
let userProfiles = [
  {
    userId: "user001",
    username: "fitness_fanatic",
    email: "fanatic@example.com",
    progress: {
      mobility: 75,
      strength: 50,
      balance: 60
    },
    preferences: {
      preferredActivities: ["yoga", "weightlifting"],
      difficultyLevel: "intermediate"
    }
  },
  // Add more UserProfile objects here
  {
    userId: "user002",
    username: "balance_guru",
    email: "guru@example.com",
    progress: {
      mobility: 60,
      strength: 40,
      balance: 85
    },
    preferences: {
      preferredActivities: ["balance beam", "tightrope"],
      difficultyLevel: "advanced"
    }
  }
];
function getUserPreferences(userId) {
  const userProfile = userProfiles.find((profile) => profile.userId === userId);
  return userProfile ? userProfile.preferences : void 0;
}
var UserPreferenceService_default = { getUserPreferences };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserPreferences
});

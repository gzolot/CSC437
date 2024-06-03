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
var UserProfileService_exports = {};
__export(UserProfileService_exports, {
  default: () => UserProfileService_default,
  getUserProfile: () => getUserProfile
});
module.exports = __toCommonJS(UserProfileService_exports);
var import_mongoose = require("mongoose");
const UserProfileSchema = new import_mongoose.Schema({
  userId: { type: String, required: true, trim: true, unique: true },
  username: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true }
  // progress: {
  //   mobility: { type: Number, required: true },
  //   strength: { type: Number, required: true },
  //   balance: { type: Number, required: true }
  // },
  // preferences: {
  //   preferredActivities: [{ type: String }],
  //   difficultyLevel: { type: String, required: true }
  // }
}, { collection: "user_profiles" });
const ProfileModel = (0, import_mongoose.model)("Profile", UserProfileSchema);
let userProfiles = [
  {
    userId: "user001",
    username: "fitness_fanatic",
    email: "fanatic@example.com"
    // progress: {
    //     mobility: 75,
    //     strength: 50,
    //     balance: 60
    // },
    // preferences: {
    //     preferredActivities: ["yoga", "weightlifting"],
    //     difficultyLevel: "intermediate"
    // }
  }
  // add more UserProfile objects here
];
function index() {
  return ProfileModel.find();
}
function get(userId) {
  console.log("Fetching user with ID:", userId);
  return ProfileModel.findOne({ userId }).then((userProfile) => {
    if (!userProfile) {
      throw new Error(`${userId} Not Found`);
    }
    return userProfile;
  });
}
function create(userProfile) {
  const newUserProfile = new ProfileModel(userProfile);
  return newUserProfile.save();
}
function getUserProfile(userId) {
  return userProfiles.find((user) => user.userId === userId);
}
function update(userId, profile) {
  return ProfileModel.findOne({ userId }).then((found) => {
    if (!found) throw `${userId} Not Found`;
    else
      return ProfileModel.findByIdAndUpdate(
        found._id,
        profile,
        {
          new: true
        }
      );
  }).then((updated) => {
    if (!updated) throw `${userId} not updated`;
    else return updated;
  });
}
var UserProfileService_default = { index, get, create, update };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserProfile
});

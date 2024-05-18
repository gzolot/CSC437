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
var ExerciseService_exports = {};
__export(ExerciseService_exports, {
  default: () => ExerciseService_default,
  getExercise: () => getExercise
});
module.exports = __toCommonJS(ExerciseService_exports);
var import_mongoose = require("mongoose");
const ExerciseSchema = new import_mongoose.Schema({
  id: { type: String, required: true, trim: true, unique: true },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  difficultyLevel: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  videoUrl: { type: String }
});
const ExerciseModel = (0, import_mongoose.model)("Exercise", ExerciseSchema);
let exercises = [
  {
    id: "ex001",
    name: "Squat",
    description: "A basic squat exercise.",
    type: "strength",
    difficultyLevel: "beginner",
    duration: 5,
    videoUrl: "http://example.com/squat-video"
  }
  // add more Exercise objects here
];
function index() {
  return ExerciseModel.find();
}
function get(exerciseId) {
  return ExerciseModel.findOne({ id: exerciseId }).then((exercise) => {
    if (!exercise) {
      throw new Error(`${exerciseId} Not Found`);
    }
    return exercise;
  });
}
function create(exercise) {
  const newExercise = new ExerciseModel(exercise);
  return newExercise.save();
}
function getExercise(id) {
  return exercises.find((exercise) => exercise.id === id);
}
var ExerciseService_default = { getExercise, index, get, create };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getExercise
});

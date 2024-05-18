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
var WorkoutPlanService_exports = {};
__export(WorkoutPlanService_exports, {
  default: () => WorkoutPlanService_default,
  getWorkoutPlan: () => getWorkoutPlan
});
module.exports = __toCommonJS(WorkoutPlanService_exports);
var import_mongoose = require("mongoose");
const WorkoutPlanSchema = new import_mongoose.Schema({
  planId: { type: String, required: true, trim: true, unique: true },
  exercises: [{ type: import_mongoose.Schema.Types.ObjectId, ref: "Exercise" }],
  createdBy: { type: String, required: true },
  createdFor: { type: String, required: true }
});
const PlanModel = (0, import_mongoose.model)("Plan", WorkoutPlanSchema);
let workoutPlans = [
  {
    planId: "plan001",
    exercises: [
      {
        id: "ex001",
        name: "Squat",
        description: "A basic squat exercise.",
        type: "strength",
        difficultyLevel: "beginner",
        duration: 5,
        videoUrl: "http://example.com/squat-video"
      }
    ],
    createdBy: "trainer001",
    createdFor: "user001"
  }
  // add more WorkoutPlan objects here
];
function index() {
  return PlanModel.find().populate("exercises");
}
function get(planId) {
  return PlanModel.findOne({ planId }).populate("exercises").then((workoutPlan) => {
    if (!workoutPlan) {
      throw new Error(`${planId} Not Found`);
    }
    return workoutPlan;
  });
}
function create(workoutPlan) {
  const newWorkoutPlan = new PlanModel(workoutPlan);
  return newWorkoutPlan.save();
}
function getWorkoutPlan(planId) {
  return workoutPlans.find((plan) => plan.planId === planId);
}
var WorkoutPlanService_default = { getWorkoutPlan, index, get, create };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getWorkoutPlan
});

// src/services/workoutPlanSvc.ts
import { Schema, Model, Document, model } from "mongoose";
import { WorkoutPlan } from "../models/WorkoutPlan";

const WorkoutPlanSchema = new Schema<WorkoutPlan>({
    planId: { type: String, required: true, trim: true, unique: true },
    exercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise' }],
    createdBy: { type: String, required: true },
    createdFor: { type: String, required: true }
  });

const PlanModel = model<WorkoutPlan>("Plan", WorkoutPlanSchema);

// in-memory DB for Workout Plans
let workoutPlans: Array<WorkoutPlan> = [
    {
        planId: "plan001",
        exercises: [
            {
                id: "ex001",
                name: "Squat",
                description: "A basic squat exercise.",
                type: 'strength',
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

function index(): Promise<WorkoutPlan[]> {
    return PlanModel.find().populate('exercises');
  }
  
  function get(planId: string): Promise<WorkoutPlan> {
    return PlanModel.findOne({ planId })
      .populate('exercises')
      .then(workoutPlan => {
        if (!workoutPlan) {
          throw new Error(`${planId} Not Found`);
        }
        return workoutPlan;
      });
  }
  
  function create(workoutPlan: WorkoutPlan): Promise<WorkoutPlan> {
    const newWorkoutPlan = new PlanModel(workoutPlan);
    return newWorkoutPlan.save();
  }

export function getWorkoutPlan(planId: string): WorkoutPlan | undefined {
    return workoutPlans.find(plan => plan.planId === planId);
}

export default { getWorkoutPlan, index, get, create };
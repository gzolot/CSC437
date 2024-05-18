// src/services/exerciseSvc.ts
import { Schema, Model, Document, model } from "mongoose";
import { Exercise } from "../models/Exercise";

const ExerciseSchema = new Schema<Exercise>({
    id: { type: String, required: true, trim: true, unique: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    type: { type: String, required: true, trim: true },
    difficultyLevel: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    videoUrl: { type: String }
  });

const ExerciseModel = model<Exercise>("Exercise", ExerciseSchema);

// in-memory DB for Exercises
let exercises: Array<Exercise> = [
    {
        id: "ex001",
        name: "Squat",
        description: "A basic squat exercise.",
        type: 'strength',
        difficultyLevel: "beginner",
        duration: 5,
        videoUrl: "http://example.com/squat-video"
    }
    // add more Exercise objects here
];

function index(): Promise<Exercise[]> {
    return ExerciseModel.find();
  }
  
  function get(exerciseId: string): Promise<Exercise> {
    return ExerciseModel.findOne({ id: exerciseId })
      .then(exercise => {
        if (!exercise) {
          throw new Error(`${exerciseId} Not Found`);
        }
        return exercise;
      });
  }
  
  function create(exercise: Exercise): Promise<Exercise> {
    const newExercise = new ExerciseModel(exercise);
    return newExercise.save();
  }
  

export function getExercise(id: string): Exercise | undefined {
    return exercises.find(exercise => exercise.id === id);
}

export default { getExercise, index, get, create };

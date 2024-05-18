import { Exercise } from './Exercise';

export interface WorkoutPlan {
    planId: string;
    exercises: Exercise[];
    createdBy: string; // could be user or trainer
    createdFor: string; // user id
 }
import express, { Request, Response } from "express";
import exercises from "../services/ExerciseService";
import { Exercise } from "../models/Exercise";

const router = express.Router();

// router.get("/:exerciseId", (req: Request, res: Response) => {
//   const { exerciseId } = req.params;
//   const exercise = getExercise(exerciseId);

//   if (exercise) res.send(exercise);
//   else res.status(404).end();
// });

router.get("/", (req: Request, res: Response) => {
  exercises
    .index()
    .then((exercises: Exercise[]) => res.json(exercises))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newExercise = req.body;
  
  exercises
    .create(newExercise)
    .then((exercise: Exercise) => res.status(201).send(exercise))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
  exercises
    .index()
    .then((list: Exercise[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

export default router;
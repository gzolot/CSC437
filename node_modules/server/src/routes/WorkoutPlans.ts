import express, { Request, Response } from "express";
import workoutPlans from "../services/WorkoutPlanService";
import { WorkoutPlan } from "../models/WorkoutPlan";

const router = express.Router();

// router.get("/:planId", (req: Request, res: Response) => {
//   const { planId } = req.params;
//   const plan = getWorkoutPlan(planId);

//   if (plan) res.send(plan);
//   else res.status(404).end();
// });

router.get("/", (req: Request, res: Response) => {
  workoutPlans
    .index()
    .then((plans: WorkoutPlan[]) => res.json(plans))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newPlan = req.body;

  workoutPlans
    .create(newPlan)
    .then((plan: WorkoutPlan) => res.status(201).send(plan))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
  workoutPlans
    .index()
    .then((list: WorkoutPlan[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});



export default router;
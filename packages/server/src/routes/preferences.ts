import express, { Request, Response } from "express";
import { getUserPreferences } from "../services/UserPreferenceService";

const router = express.Router();

router.get("/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  const preferences = getUserPreferences(userId);

  if (preferences) res.send(preferences);
  else res.status(404).end();
});


export default router;
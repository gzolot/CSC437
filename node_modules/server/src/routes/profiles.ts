import express, { Request, Response } from "express";
import userProfiles from "../services/UserProfileService";
import { UserProfile } from "../models/UserProfile";

const router = express.Router();

// router.get("/:userid", (req: Request, res: Response) => {
//   const { userid } = req.params;
//   const got = userProfiles.getUserProfile(userid);

//   if (got) res.send(got);
//   else res.status(404).end();
// });

router.get("/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log("Fetching user with ID:", userId);
  userProfiles
    .get(userId)
    .then((profile: UserProfile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

router.post("/", (req: Request, res: Response) => {
  const newProfile = req.body;
  console.log("Creating new user profile with data:", newProfile);
  userProfiles
    .create(newProfile)
    .then((profile: UserProfile) => res.status(201).send(profile))
    .catch((err) => res.status(500).send(err));
});

router.get("/", (req: Request, res: Response) => {
  userProfiles
    .index()
    .then((list: UserProfile[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

router.put("/:userId", (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log("Updating user with ID:", userId);
  const newProfile = req.body;

  userProfiles
    .update(userId, newProfile)
    .then((profile: UserProfile) => res.json(profile))
    .catch((err) => res.status(404).end());
});

export default router;
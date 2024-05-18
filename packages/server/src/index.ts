import express, { Request, Response } from "express";
import profiles from "./routes/profiles";
import exercises from './routes/Exercises';
import preferences from './routes/preferences';
import workoutplans from './routes/WorkoutPlans';
import { connect } from "./services/mongo";
import path from 'path';


import auth, { authenticateUser } from "./routes/auth";

connect("gabezolot")

const app = express();


app.use(express.json());
app.use("/auth", auth);
app.use("/api/profiles",authenticateUser, profiles);
app.use("/api/preferences", preferences);
app.use("/api/workoutplans", workoutplans);
app.use("/api/exercises", exercises);

const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

app.use(express.static(staticDir));

const nodeModules = path.resolve(
  __dirname,
  "../../../node_modules"
);
console.log("Serving NPM packages from", nodeModules);
app.use("/node_modules", express.static(nodeModules));

app.get("/hello", (req: Request, res: Response) => {
    res.send("Hello, World");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
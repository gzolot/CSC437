// src/services/userProfileSvc.ts
import { Schema, Model, Document, model } from "mongoose";
import { UserProfile } from "../models/UserProfile";

const UserProfileSchema = new Schema<UserProfile>({
    userId: { type: String, required: true, trim: true, unique: true },
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    // progress: {
    //   mobility: { type: Number, required: true },
    //   strength: { type: Number, required: true },
    //   balance: { type: Number, required: true }
    // },
    // preferences: {
    //   preferredActivities: [{ type: String }],
    //   difficultyLevel: { type: String, required: true }
    // }
  }, { collection: "user_profiles" });

const ProfileModel = model<UserProfile>("Profile", UserProfileSchema);

// in-memory DB for User Profiles
let userProfiles: Array<UserProfile> = [
    {
        userId: "user001",
        username: "fitness_fanatic",
        email: "fanatic@example.com",
        // progress: {
        //     mobility: 75,
        //     strength: 50,
        //     balance: 60
        // },
        // preferences: {
        //     preferredActivities: ["yoga", "weightlifting"],
        //     difficultyLevel: "intermediate"
        // }
    }
    // add more UserProfile objects here
];

function index(): Promise<UserProfile[]> {
    return ProfileModel.find();
}
  
function get(userId: string): Promise<UserProfile> {
  console.log("Fetching user with ID:", userId);
  return ProfileModel.findOne({ userId })
    .then(userProfile => {
      if (!userProfile) {
        throw new Error(`${userId} Not Found`);
      }
      return userProfile;
    });
}
  
function create(userProfile: UserProfile): Promise<UserProfile> {
  const newUserProfile = new ProfileModel(userProfile);
  return newUserProfile.save();
}

export function getUserProfile(userId: string): UserProfile | undefined {
    return userProfiles.find(user => user.userId === userId);
}

function update(
  userId: String,
  profile: UserProfile
): Promise<UserProfile> {
  return ProfileModel.findOne({ userId })
    .then((found) => {
      if (!found) throw `${userId} Not Found`;
      else
        return ProfileModel.findByIdAndUpdate(
          found._id,
          profile,
          {
            new: true
          }
        );
    })
    .then((updated) => {
      if (!updated) throw `${userId} not updated`;
      else return updated as UserProfile;
    });
}

export default { index, get, create, update};
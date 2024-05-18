// src/services/userPreferenceService.ts
import { Schema, Model, Document, model } from "mongoose";
import { UserProfile } from "../models/UserProfile";
import { UserPreferences } from "../models/UserPreferences";

// This assumes that UserPreferences are part of UserProfile in your data model
// Mock in-memory DB for UserProfiles including UserPreferences
let userProfiles: Array<UserProfile> = [
    {
        userId: "user001",
        username: "fitness_fanatic",
        email: "fanatic@example.com",
        progress: {
            mobility: 75,
            strength: 50,
            balance: 60
        },
        preferences: {
            preferredActivities: ["yoga", "weightlifting"],
            difficultyLevel: "intermediate"
        }
    },
    // Add more UserProfile objects here
    {
        userId: "user002",
        username: "balance_guru",
        email: "guru@example.com",
        progress: {
            mobility: 60,
            strength: 40,
            balance: 85
        },
        preferences: {
            preferredActivities: ["balance beam", "tightrope"],
            difficultyLevel: "advanced"
        }
    }
];

export function getUserPreferences(userId: string): UserPreferences | undefined {
    const userProfile = userProfiles.find(profile => profile.userId === userId);
    return userProfile ? userProfile.preferences : undefined;
}

export default { getUserPreferences };

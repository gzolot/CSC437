import { UserPreferences } from './UserPreferences';

export interface UserProfile {
    userId: string;
    username: string;
    email: string;
    progress: {
        mobility: number;
        strength: number;
        balance: number;
    };
    preferences: UserPreferences;
 }
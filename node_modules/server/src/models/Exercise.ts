export interface Exercise {
    id: string;
    name: string;
    description: string;
    type: 'mobility' | 'strength' | 'balance';
    difficultyLevel: string;
    duration: number; // in minutes
    videoUrl?: string;
 }
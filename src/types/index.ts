export interface Character {
  name: string;
  chance: number;
  rarity: string;
}

export interface UserStats {
  userId: number;
  username: string;
  firstName: string;
  pulledCharacters: { [characterName: string]: number }; 
  achievements: string[];
  level: number; 
  experience: number;
  rating: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
} 
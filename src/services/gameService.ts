import { Character } from '../types';
import { characters } from '../data/gameData';

export class GameService {
  public getRandomCharacter(): Character {
    const random = Math.random();
    let cumulativeChance = 0;

    for (const character of characters) {
      cumulativeChance += character.chance;
      if (random < cumulativeChance) {
        return character;
      }
    }

    return characters[0];
  }
} 
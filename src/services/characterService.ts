import { Character } from '../models/interfaces';
import { characters } from '../config/characters';


export function getRandomCharacter(): Character {
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

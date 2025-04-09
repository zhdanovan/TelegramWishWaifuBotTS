import { UserStats } from '../types';
import { characters, achievements } from '../data/gameData';
import { Telegraf } from 'telegraf';

export class UserStatsService {
  private userStatsMap: Map<number, UserStats> = new Map();
  private bot: Telegraf;

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  public getUserStats(userId: number): UserStats | undefined {
    return this.userStatsMap.get(userId);
  }

  public updateUserStats(userId: number, username: string, firstName: string, characterName: string): void {
    if (!this.userStatsMap.has(userId)) {
      this.userStatsMap.set(userId, {
        userId,
        username,
        firstName,
        pulledCharacters: {},
        achievements: [],
        level: 1,
        experience: 0,
        rating: 0,
      });
    }

    const userStats = this.userStatsMap.get(userId)!;
    if (!userStats.pulledCharacters[characterName]) {
      userStats.pulledCharacters[characterName] = 0;
    }
    userStats.pulledCharacters[characterName] += 1;

    userStats.experience += 10;

    const character = characters.find(c => c.name === characterName);
    if (character) {
      if (character.rarity === '⭐⭐⭐⭐⭐') {
        userStats.rating += 20;
      } else if (character.rarity === '⭐⭐⭐⭐') {
        userStats.rating += 10;
      }
    }

    this.checkLevelUp(userStats);
    this.checkAchievements(userId, characterName);
  }

  private checkLevelUp(userStats: UserStats): void {
    const experienceRequired = userStats.level * 100;

    if (userStats.experience >= experienceRequired) {
      userStats.level += 1;
      userStats.experience = 0;

      this.bot.telegram.sendMessage(
        userStats.userId,
        `🎉 Поздравляем! Вы достигли уровня ${userStats.level}!`,
        { parse_mode: 'Markdown' }
      ).catch(error => {
        console.error('Ошибка при отправке сообщения о повышении уровня:', error);
      });
    }
  }

  private async checkAchievements(userId: number, characterName: string): Promise<void> {
    const userStats = this.userStatsMap.get(userId);
    if (!userStats) return;

    const totalWishes = Object.values(userStats.pulledCharacters).reduce((a, b) => a + b, 0);

    if (totalWishes === 1 && !userStats.achievements.includes('first_wish')) {
      userStats.achievements.push('first_wish');
      try {
        await this.bot.telegram.sendMessage(
          userId,
          `🎉 Вы получили достижение: *${achievements[0].name}*!\n${achievements[0].description}`,
          { parse_mode: 'Markdown' }
        );
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }

    const character = characters.find(c => c.name === characterName);
    if (character && (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') && !userStats.achievements.includes('rare_character')) {
      userStats.achievements.push('rare_character');
      try {
        await this.bot.telegram.sendMessage(
          userId,
          `🎉 Вы получили достижение: *${achievements[1].name}*!\n${achievements[1].description}`,
          { parse_mode: 'Markdown' }
        );
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }
  }

  public getTopUsers(limit: number = 10): UserStats[] {
    return Array.from(this.userStatsMap.values())
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }
} 
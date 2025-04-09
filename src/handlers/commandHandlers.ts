import { Context } from 'telegraf';
import { Markup } from 'telegraf';
import { UserStatsService } from '../services/userStatsService';
import { GameService } from '../services/gameService';
import { characters } from '../data/gameData';

export class CommandHandlers {
  constructor(
    private userStatsService: UserStatsService,
    private gameService: GameService
  ) {}

  public async handleStart(ctx: Context): Promise<void> {
    try {
      const welcomeMessage = `👋 Привет, ${ctx.from?.first_name}! Я бот для розыгрыша персонажей. Используй кнопку ниже, чтобы сделать wish!`;
      await ctx.reply(welcomeMessage, Markup.keyboard([
        ['🎲 Сделать wish', '📊 Моя статистика', '🏆 Топ пользователей']
      ]).resize());
    } catch (error) {
      console.error('Ошибка при отправке приветственного сообщения:', error);
    }
  }

  public async handleWish(ctx: Context): Promise<void> {
    if (ctx.from?.is_bot) {
      return ctx.reply('Боты не могут использовать эту команду.');
    }

    const username = ctx.from?.username || ctx.from?.first_name || 'Пользователь';
    const character = this.gameService.getRandomCharacter();
    const userId = ctx.from?.id;
    const firstName = ctx.from?.first_name || 'Пользователь';

    if (userId) {
      this.userStatsService.updateUserStats(userId, username, firstName, character.name);
    }

    let message = `🎲 Пользователь @${username} выбил персонажа: `;
    if (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') {
      message += `**${character.name}** ${character.rarity} 🎉`;
    } else {
      message += `${character.name} ${character.rarity}`;
    }

    await ctx.replyWithMarkdownV2(message);
  }

  public async handleStats(ctx: Context): Promise<void> {
    if (ctx.from?.is_bot) {
      return ctx.reply('Боты не могут использовать эту команду.');
    }
    if (!ctx.from) {
      return ctx.reply('Не удалось получить информацию о пользователе.');
    }

    const userId = ctx.from.id;
    const userStats = this.userStatsService.getUserStats(userId);

    if (!userStats) {
      return ctx.reply('Вы еще не делали wish.');
    }

    let message = `📊 Ваша статистика:\n\n`;
    message += `🎚️ Уровень: ${userStats.level}\n`;
    message += `📈 Опыт: ${userStats.experience}/${userStats.level * 100}\n\n`;
    message += `🏅 Рейтинг: ${userStats.rating} очков\n\n`;

    for (const [characterName, count] of Object.entries(userStats.pulledCharacters)) {
      message += `- ${characterName}: ${count} раз\n`;
    }

    const notPulledCharacters = characters.filter(character => !userStats.pulledCharacters[character.name]);
    if (notPulledCharacters.length > 0) {
      message += `\n🚫 Не выбиты:\n`;
      notPulledCharacters.forEach(character => {
        message += `- ${character.name}\n`;
      });
    }

    if (userStats.achievements.length > 0) {
      message += `\n🏆 Достижения:\n`;
      userStats.achievements.forEach(achievementId => {
        const achievement = achievements.find(a => a.id === achievementId);
        if (achievement) {
          message += `- ${achievement.name}: ${achievement.description}\n`;
        }
      });
    } else {
      message += `\n🏆 У вас пока нет достижений.\n`;
    }

    await ctx.reply(message);
  }

  public async handleTopUsers(ctx: Context): Promise<void> {
    if (ctx.from?.is_bot) {
      return ctx.reply('Боты не могут использовать эту команду.');
    }

    const topUsers = this.userStatsService.getTopUsers();

    let message = '🏆 Топ пользователей:\n\n';
    topUsers.forEach((user, index) => {
      message += `${index + 1}. @${user.username} - ${user.rating} очков (Уровень ${user.level})\n`;
    });

    if (topUsers.length === 0) {
      message = 'Пока никто не в топе. Сделайте wish, чтобы подняться в рейтинге!';
    }

    await ctx.reply(message);
  }
} 
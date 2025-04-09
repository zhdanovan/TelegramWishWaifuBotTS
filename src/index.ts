import { Telegraf } from 'telegraf';
import { UserStatsService } from './services/userStatsService';
import { GameService } from './services/gameService';
import { CommandHandlers } from './handlers/commandHandlers';

// Initialize bot with your token
const bot = new Telegraf('YOUR_BOT_TOKEN');

// Initialize services
const userStatsService = new UserStatsService(bot);
const gameService = new GameService();

// Initialize command handlers
const commandHandlers = new CommandHandlers(userStatsService, gameService);

// Register command handlers
bot.start((ctx) => commandHandlers.handleStart(ctx));
bot.hears('🎲 Сделать wish', (ctx) => commandHandlers.handleWish(ctx));
bot.hears('📊 Моя статистика', (ctx) => commandHandlers.handleStats(ctx));
bot.hears('🏆 Топ пользователей', (ctx) => commandHandlers.handleTopUsers(ctx));

// Launch bot
bot.launch()
  .then(() => {
    console.log('Бот запущен...');
  })
  .catch((error) => {
    console.error('Ошибка при запуске бота:', error);
  });

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM')); 
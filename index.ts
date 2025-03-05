import { Telegraf, Markup, Context as TelegrafContext, Context } from 'telegraf';

interface Character {
  name: string;
  chance: number;
  rarity: string;
}

interface UserStats {
  userId: number;
  username: string;
  firstName: string;
  pulledCharacters: { [characterName: string]: number }; 
}

const bot = new Telegraf('');

const characters : Character[] = [
  { name: 'Ки Хун', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' }, 
  { name: 'Сангву', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' }, 
  { name: '457', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' }, 
  { name: 'Ли Дон Ук', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' },
  { name: 'Визиткинс', chance: 0.02, rarity: '⭐⭐⭐⭐' }, 
  { name: 'Сэбек', chance: 0.05, rarity: '⭐⭐⭐' },
  { name: 'ИнХо', chance: 0.05, rarity: '⭐⭐⭐' },
  { name: '101', chance: 0.1, rarity: '⭐⭐' },
  { name: 'Танос', chance: 0.1, rarity: '⭐⭐' },
  { name: 'Хамстерщик', chance: 0.1, rarity: '⭐⭐' },
  { name: 'Али', chance: 0.15, rarity: '⭐' },
  { name: 'Рыбак', chance: 0.2, rarity: '⭐' },
  // Персонажи из Genshin Impact
  { name: 'Дилюк', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' }, 
  { name: 'Арлекино', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' },
  { name: 'Дайнслейф', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' },
  { name: 'Кэ Цин', chance: 0.02, rarity: '⭐⭐⭐⭐' }, 
  { name: 'Мона', chance: 0.02, rarity: '⭐⭐⭐⭐' }, 
  { name: 'Чжун Ли', chance: 0.01, rarity: '⭐⭐⭐⭐⭐' }, 
  { name: 'Венти', chance: 0.02, rarity: '⭐⭐⭐⭐' }, 
  { name: 'Кли', chance: 0.1, rarity: '⭐⭐' },
  { name: 'Эмбер', chance: 0.15, rarity: '⭐' },
  { name: 'Лиза', chance: 0.15, rarity: '⭐' },
  { name: 'Барбара', chance: 0.2, rarity: '⭐' },
  { name: 'Сян Лин', chance: 0.2, rarity: '⭐' },
];


const userStatsMap: Map<number, UserStats> = new Map();

function getRandomCharacter(): Character {
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

function updateUserStats(userId: number, username: string, firstName: string, characterName: string): void {
  if (!userStatsMap.has(userId)) {
    userStatsMap.set(userId, {
      userId,
      username,
      firstName,
      pulledCharacters: {},
    });
  }

  const userStats = userStatsMap.get(userId)!;
  if (!userStats.pulledCharacters[characterName]) {
    userStats.pulledCharacters[characterName] = 0;
  }
  userStats.pulledCharacters[characterName] += 1;
}

function getUserStats(userId: number): UserStats | undefined {
  return userStatsMap.get(userId);
}

bot.start((ctx : Context) => {
  const welcomeMessage = `👋 Привет, ${ctx.from?.first_name}! Я бот для розыгрыша персонажей. Используй кнопку ниже, чтобы сделать wish!`;
  ctx.reply(welcomeMessage, Markup.keyboard([
    ['🎲 Сделать wish', '📊 Моя статистика']
  ]).resize());
}); 

bot.hears('🎲 Сделать wish', (ctx) => {
  if (ctx.from.is_bot) {
      return ctx.reply('Боты не могут использовать эту команду.');
  }

  const username = ctx.from.username || ctx.from.first_name;
  const character = getRandomCharacter();
  const userId = ctx.from.id;
  const firstName = ctx.from.first_name || 'Пользователь';

  updateUserStats(userId, username, firstName, character.name);

  let message = `🎲 Пользователь @${username} выбил персонажа: `;
  if (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') {
      message += `**${character.name}** ${character.rarity} 🎉`;
  } else {
      message += `${character.name} ${character.rarity}`;
  }

  ctx.replyWithMarkdownV2(message);
});

bot.hears('📊 Моя статистика', (ctx: Context) => {
  if (ctx.from?.is_bot) {
      return ctx.reply('Боты не могут использовать эту команду.');
  }
  if (!ctx.from) {
    return ctx.reply('Не удалось получить информацию о пользователе.');
  }
  const userId = ctx.from.id;
  const userStats = getUserStats(userId);

  if (!userStats) {
    return ctx.reply('Вы еще не делали wish.');
  }

  let message = `📊 Ваша статистика:\n\n`;
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

  ctx.reply(message);
});


bot.launch();

console.log('Бот запущен...');
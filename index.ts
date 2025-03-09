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
  achievements:string[];
  level: number; 
  experience: number;
  rating : number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
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

const achievements : Achievement[] = [
  { id: 'first_wish', name: 'Первый Wish', description: 'Получи первого персонажа' },
  { id: 'rare_character', name: 'Коллекционер', description: 'Выбейте первого редкого персонажа' },
]


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
      achievements: [],
      level: 1, 
      experience: 0,
      rating : 0,
    });
  }

  const userStats = userStatsMap.get(userId)!;
  if (!userStats.pulledCharacters[characterName]) {
    userStats.pulledCharacters[characterName] = 0;
  }
  userStats.pulledCharacters[characterName] += 1;

   userStats.experience += 10; 

  const character = characters.find(c => c.name === characterName);
  if (character && (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐')) {
  userStats.rating += 10; 
  }


   checkLevelUp(userStats);

  checkAchievements(userId, characterName);
}

function checkLevelUp(userStats: UserStats): void {
  const experienceRequired = userStats.level * 100;

  if (userStats.experience >= experienceRequired) {
    userStats.level += 1;
    userStats.experience = 0;

    bot.telegram.sendMessage(
      userStats.userId,
      `🎉 Поздравляем! Вы достигли уровня ${userStats.level}!`,
      { parse_mode: 'Markdown' }
    ).catch(error => {
      console.error('Ошибка при отправке сообщения о повышении уровня:', error);
    });
  }
}

async function checkAchievements(userId: number, characterName: string): Promise<void> {
  const userStats = userStatsMap.get(userId);
  if (!userStats) return;

  const totalWishes = Object.values(userStats.pulledCharacters).reduce((a, b) => a + b, 0);


  if (totalWishes === 1 && !userStats.achievements.includes('first_wish')) {
    userStats.achievements.push('first_wish');
    try {
      await bot.telegram.sendMessage(
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
      await bot.telegram.sendMessage(
        userId,
        `🎉 Вы получили достижение: *${achievements[1].name}*!\n${achievements[1].description}`,
        { parse_mode: 'Markdown' }
      );
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
    }
  }
}


function getUserStats(userId: number): UserStats | undefined {
  return userStatsMap.get(userId);
}

bot.start((ctx : Context) => {
  try {
  const welcomeMessage = `👋 Привет, ${ctx.from?.first_name}! Я бот для розыгрыша персонажей. Используй кнопку ниже, чтобы сделать wish!`;
  ctx.reply(welcomeMessage, Markup.keyboard([
    ['🎲 Сделать wish', '📊 Моя статистика']
  ]).resize());
}
catch(error){
  console.error('Ошибка при отправке приветственного сообщения:', error);
}
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

  ctx.reply(message);
});


bot.launch();

console.log('Бот запущен...');
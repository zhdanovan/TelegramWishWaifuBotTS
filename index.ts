import { Telegraf, Markup } from 'telegraf';

interface Character {
  name: string;
  chance: number;
  rarity: string;
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

bot.start((ctx) => {
  const welcomeMessage = `👋 Привет, ${ctx.from.first_name}! Я бот для розыгрыша персонажей. Используй кнопку ниже, чтобы сделать wish!`;
  ctx.reply(welcomeMessage, Markup.keyboard([
    ['🎲 Сделать wish']
  ]).resize());
});

bot.hears('🎲 Сделать wish', (ctx) => {
  if (ctx.from.is_bot) {
      return ctx.reply('Боты не могут использовать эту команду.');
  }

  const username = ctx.from.username || ctx.from.first_name;
  const character = getRandomCharacter();

  let message = `🎲 Пользователь @${username} выбил персонажа: `;
  if (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') {
      message += `**${character.name}** ${character.rarity} 🎉`;
  } else {
      message += `${character.name} ${character.rarity}`;
  }

  ctx.replyWithMarkdownV2(message);
});

bot.launch();

console.log('Бот запущен...');
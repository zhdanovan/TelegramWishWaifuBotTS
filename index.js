"use strict";
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var bot = new telegraf_1.Telegraf('');
var characters = [
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
var userStatsMap = new Map();
var achievements = [
    { id: 'first_wish', name: 'Первый Wish', description: 'Получи первого персонажа' },
    { id: 'rare_character', name: 'Коллекционер', description: 'Выбейте первого редкого персонажа' },
];
function getRandomCharacter() {
    var random = Math.random();
    var cumulativeChance = 0;
    for (var _i = 0, characters_1 = characters; _i < characters_1.length; _i++) {
        var character = characters_1[_i];
        cumulativeChance += character.chance;
        if (random < cumulativeChance) {
            return character;
        }
    }
    return characters[0];
}
function updateUserStats(userId, username, firstName, characterName) {
    if (!userStatsMap.has(userId)) {
        userStatsMap.set(userId, {
            userId: userId,
            username: username,
            firstName: firstName,
            pulledCharacters: {},
            achievements: []
        });
    }
    var userStats = userStatsMap.get(userId);
    if (!userStats.pulledCharacters[characterName]) {
        userStats.pulledCharacters[characterName] = 0;
    }
    userStats.pulledCharacters[characterName] += 1;
    checkAchievements(userId, characterName);
}
function checkAchievements(userId, characterName) {
    var userStats = userStatsMap.get(userId);
    if (!userStats)
        return;
    var totalWishes = Object.values(userStats.pulledCharacters).reduce(function (a, b) { return a + b; }, 0);
    if (totalWishes === 1 && !userStats.achievements.includes('first_wish')) {
        userStats.achievements.push('first_wish');
        bot.telegram.sendMessage(userId, "\uD83C\uDF89 \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435: *".concat(achievements[0].name, "*!\n").concat(achievements[0].description), { parse_mode: 'Markdown' });
    }
    var character = characters.find(function (c) { return c.name === characterName; });
    if (character && (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') && !userStats.achievements.includes('rare_character')) {
        userStats.achievements.push('rare_character');
        bot.telegram.sendMessage(userId, "\uD83C\uDF89 \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435: *".concat(achievements[1].name, "*!\n").concat(achievements[1].description), { parse_mode: 'Markdown' });
    }
}
function getUserStats(userId) {
    return userStatsMap.get(userId);
}
bot.start(function (ctx) {
    var _a;
    var welcomeMessage = "\uD83D\uDC4B \u041F\u0440\u0438\u0432\u0435\u0442, ".concat((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name, "! \u042F \u0431\u043E\u0442 \u0434\u043B\u044F \u0440\u043E\u0437\u044B\u0433\u0440\u044B\u0448\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C wish!");
    ctx.reply(welcomeMessage, telegraf_1.Markup.keyboard([
        ['🎲 Сделать wish', '📊 Моя статистика']
    ]).resize());
});
bot.hears('🎲 Сделать wish', function (ctx) {
    if (ctx.from.is_bot) {
        return ctx.reply('Боты не могут использовать эту команду.');
    }
    var username = ctx.from.username || ctx.from.first_name;
    var character = getRandomCharacter();
    var userId = ctx.from.id;
    var firstName = ctx.from.first_name || 'Пользователь';
    updateUserStats(userId, username, firstName, character.name);
    var message = "\uD83C\uDFB2 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C @".concat(username, " \u0432\u044B\u0431\u0438\u043B \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430: ");
    if (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') {
        message += "**".concat(character.name, "** ").concat(character.rarity, " \uD83C\uDF89");
    }
    else {
        message += "".concat(character.name, " ").concat(character.rarity);
    }
    ctx.replyWithMarkdownV2(message);
});
bot.hears('📊 Моя статистика', function (ctx) {
    var _a;
    if ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.is_bot) {
        return ctx.reply('Боты не могут использовать эту команду.');
    }
    if (!ctx.from) {
        return ctx.reply('Не удалось получить информацию о пользователе.');
    }
    var userId = ctx.from.id;
    var userStats = getUserStats(userId);
    if (!userStats) {
        return ctx.reply('Вы еще не делали wish.');
    }
    var message = "\uD83D\uDCCA \u0412\u0430\u0448\u0430 \u0441\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430:\n\n";
    for (var _i = 0, _b = Object.entries(userStats.pulledCharacters); _i < _b.length; _i++) {
        var _c = _b[_i], characterName = _c[0], count = _c[1];
        message += "- ".concat(characterName, ": ").concat(count, " \u0440\u0430\u0437\n");
    }
    var notPulledCharacters = characters.filter(function (character) { return !userStats.pulledCharacters[character.name]; });
    if (notPulledCharacters.length > 0) {
        message += "\n\uD83D\uDEAB \u041D\u0435 \u0432\u044B\u0431\u0438\u0442\u044B:\n";
        notPulledCharacters.forEach(function (character) {
            message += "- ".concat(character.name, "\n");
        });
    }
    ctx.reply(message);
});
bot.launch();
console.log('Бот запущен...');

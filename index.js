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
bot.command('wish', function (ctx) {
    if (ctx.from.is_bot) {
        return ctx.reply('Боты не могут использовать эту команду.');
    }
    var username = ctx.from.username || ctx.from.first_name;
    var character = getRandomCharacter();
    var message = "\uD83C\uDFB2 \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C @".concat(username, " \u0432\u044B\u0431\u0438\u043B \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430: ");
    if (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') {
        message += "**".concat(character.name, "** ").concat(character.rarity, " \uD83C\uDF89");
    }
    else {
        message += "".concat(character.name, " ").concat(character.rarity);
    }
    ctx.replyWithMarkdownV2(message);
});
bot.launch();
console.log('Бот запущен...');

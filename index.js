"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
            achievements: [],
            level: 1,
            experience: 0,
            rating: 0
        });
    }
    var userStats = userStatsMap.get(userId);
    if (!userStats.pulledCharacters[characterName]) {
        userStats.pulledCharacters[characterName] = 0;
    }
    userStats.pulledCharacters[characterName] += 1;
    userStats.experience += 10;
    var character = characters.find(function (c) { return c.name === characterName; });
    if (character) {
        if (character.rarity === '⭐⭐⭐⭐⭐') {
            userStats.rating += 20;
        }
        else if (character.rarity === '⭐⭐⭐⭐') {
            userStats.rating += 10;
        }
    }
    checkLevelUp(userStats);
    checkAchievements(userId, characterName);
}
function checkLevelUp(userStats) {
    var experienceRequired = userStats.level * 100;
    if (userStats.experience >= experienceRequired) {
        userStats.level += 1;
        userStats.experience = 0;
        bot.telegram.sendMessage(userStats.userId, "\uD83C\uDF89 \u041F\u043E\u0437\u0434\u0440\u0430\u0432\u043B\u044F\u0435\u043C! \u0412\u044B \u0434\u043E\u0441\u0442\u0438\u0433\u043B\u0438 \u0443\u0440\u043E\u0432\u043D\u044F ".concat(userStats.level, "!"), { parse_mode: 'Markdown' })["catch"](function (error) {
            console.error('Ошибка при отправке сообщения о повышении уровня:', error);
        });
    }
}
function checkAchievements(userId, characterName) {
    return __awaiter(this, void 0, void 0, function () {
        var userStats, totalWishes, error_1, character, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    userStats = userStatsMap.get(userId);
                    if (!userStats)
                        return [2 /*return*/];
                    totalWishes = Object.values(userStats.pulledCharacters).reduce(function (a, b) { return a + b; }, 0);
                    if (!(totalWishes === 1 && !userStats.achievements.includes('first_wish'))) return [3 /*break*/, 4];
                    userStats.achievements.push('first_wish');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, bot.telegram.sendMessage(userId, "\uD83C\uDF89 \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435: *".concat(achievements[0].name, "*!\n").concat(achievements[0].description), { parse_mode: 'Markdown' })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Ошибка при отправке сообщения:', error_1);
                    return [3 /*break*/, 4];
                case 4:
                    character = characters.find(function (c) { return c.name === characterName; });
                    if (!(character && (character.rarity === '⭐⭐⭐⭐⭐' || character.rarity === '⭐⭐⭐⭐') && !userStats.achievements.includes('rare_character'))) return [3 /*break*/, 8];
                    userStats.achievements.push('rare_character');
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, bot.telegram.sendMessage(userId, "\uD83C\uDF89 \u0412\u044B \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0435: *".concat(achievements[1].name, "*!\n").concat(achievements[1].description), { parse_mode: 'Markdown' })];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    error_2 = _a.sent();
                    console.error('Ошибка при отправке сообщения:', error_2);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
function getUserStats(userId) {
    return userStatsMap.get(userId);
}
bot.start(function (ctx) {
    var _a;
    try {
        var welcomeMessage = "\uD83D\uDC4B \u041F\u0440\u0438\u0432\u0435\u0442, ".concat((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.first_name, "! \u042F \u0431\u043E\u0442 \u0434\u043B\u044F \u0440\u043E\u0437\u044B\u0433\u0440\u044B\u0448\u0430 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0435\u0439. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439 \u043A\u043D\u043E\u043F\u043A\u0443 \u043D\u0438\u0436\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u0434\u0435\u043B\u0430\u0442\u044C wish!");
        ctx.reply(welcomeMessage, telegraf_1.Markup.keyboard([
            ['🎲 Сделать wish', '📊 Моя статистика', '🏆 Топ пользователей']
        ]).resize());
    }
    catch (error) {
        console.error('Ошибка при отправке приветственного сообщения:', error);
    }
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
    message += "\uD83C\uDF9A\uFE0F \u0423\u0440\u043E\u0432\u0435\u043D\u044C: ".concat(userStats.level, "\n");
    message += "\uD83D\uDCC8 \u041E\u043F\u044B\u0442: ".concat(userStats.experience, "/").concat(userStats.level * 100, "\n\n");
    message += "\uD83C\uDFC5 \u0420\u0435\u0439\u0442\u0438\u043D\u0433: ".concat(userStats.rating, " \u043E\u0447\u043A\u043E\u0432\n\n");
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
    if (userStats.achievements.length > 0) {
        message += "\n\uD83C\uDFC6 \u0414\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u044F:\n";
        userStats.achievements.forEach(function (achievementId) {
            var achievement = achievements.find(function (a) { return a.id === achievementId; });
            if (achievement) {
                message += "- ".concat(achievement.name, ": ").concat(achievement.description, "\n");
            }
        });
    }
    else {
        message += "\n\uD83C\uDFC6 \u0423 \u0432\u0430\u0441 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0439.\n";
    }
    ctx.reply(message);
});
bot.hears('🏆 Топ пользователей', function (ctx) {
    var _a;
    if ((_a = ctx.from) === null || _a === void 0 ? void 0 : _a.is_bot) {
        return ctx.reply('Боты не могут использовать эту команду.');
    }
    var topUsers = Array.from(userStatsMap.values())
        .sort(function (a, b) { return b.rating - a.rating; })
        .slice(0, 10);
    var message = '🏆 Топ пользователей:\n\n';
    topUsers.forEach(function (user, index) {
        message += "".concat(index + 1, ". @").concat(user.username, " - ").concat(user.rating, " \u043E\u0447\u043A\u043E\u0432 (\u0423\u0440\u043E\u0432\u0435\u043D\u044C ").concat(user.level, ")\n");
    });
    if (topUsers.length === 0) {
        message = 'Пока никто не в топе. Сделайте wish, чтобы подняться в рейтинге!';
    }
    ctx.reply(message);
});
bot.launch();
console.log('Бот запущен...');

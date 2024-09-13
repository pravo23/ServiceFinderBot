const TelegramBot = require('node-telegram-bot-api');
const { handleFind, handleAdd } = require('./commands');
require('dotenv').config();

// Initialize the bot with the token from environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Start command
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome! You can search or onboard service providers.");
});

// Find providers command
bot.onText(/\/find (.+)/, (msg, match) => {
  handleFind(bot, msg, match);
});

// Add provider command
bot.onText(/\/add (.+)/, (msg, match) => {
  handleAdd(bot, msg, match);
});

module.exports = bot;
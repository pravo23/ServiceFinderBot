const TelegramBot = require('node-telegram-bot-api');
const { handleFind, handleAdd } = require('./commands');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Start command: Provide bot description and commands
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const description = `
*👋 Welcome to ServiceFinder Bot!*

This bot helps you find and add service providers. (e.g., electricians, plumbers)**.

Here are the available commands:

1. *Add a new service provider*
   - \`/add <service> <name> with <phone> in <city>\`
   - Example: \`/add plumber Tom with 9999999991 in Delhi\`

2. *Find service providers in a city*
   - \`/find <service> in <city>\`
   - Example: \`/find plumber in Delhi\`

Follow the format for best results! 😊
`;

  bot.sendMessage(chatId, description, { parse_mode: 'Markdown' });
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

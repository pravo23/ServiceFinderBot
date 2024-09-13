const redis = require('../config/redis');

async function handleFind(bot, msg, match) {
  const chatId = msg.chat.id;
  let input = match[1].trim();

  input = input.replace(/\s{2,}/g, ' ');

  const parts = input.split(' in ');

  if (parts.length !== 2) {
    bot.sendMessage(chatId, "Please provide the correct format: /find <service> in <city>");
    return;
  }

  const [service, city] = parts;

  const cleanService = cleanValue(service);
  const cleanCity = cleanValue(city);

  if (!cleanService || !cleanCity) {
    bot.sendMessage(chatId, "Invalid input values. Please make sure both service and city are correctly formatted.");
    return;
  }

  const key = `${cleanCity.toLowerCase()}_${cleanService.toLowerCase()}`;

  try {
    const providers = await redis.smembers(key);

    if (providers.length > 0) {
      const providerList = providers.map((provider, index) => `${index + 1}. ${provider}`).join('\n');
      bot.sendMessage(chatId, `Here are the ${cleanService} providers in ${cleanCity}:\n\n${providerList}`);
    } else {
      bot.sendMessage(chatId, `No ${cleanService} providers found in ${cleanCity}.`);
    }
  } catch (err) {
    console.error('Error fetching providers:', err);
    bot.sendMessage(chatId, "An error occurred while fetching the service providers.");
  }
}

function cleanValue(value) {
  let cleaned = value.trim();
  cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, '');
  return cleaned;
}

async function handleAdd(bot, msg, match) {
  const chatId = msg.chat.id;
  let input = match[1].trim();

  input = input.replace(/\s{2,}/g, ' ');

  const parts = input.split(' with ');

  if (parts.length !== 2) {
    bot.sendMessage(chatId, "Please provide the correct format: /add <service> <name> with <phone> in <city>");
    return;
  }

  const [serviceAndName, phoneAndCity] = parts;

  const phoneCityParts = phoneAndCity.split(' in ');

  if (phoneCityParts.length !== 2) {
    bot.sendMessage(chatId, "Please provide the correct format: /add <service> <name> with <phone> in <city>");
    return;
  }

  const [phone, city] = phoneCityParts;
  const [service, name] = serviceAndName.split(' ');

  const cleanService = cleanValue(service);
  const cleanName = cleanValue(name);
  const cleanPhone = cleanValue(phone);
  const cleanCity = cleanValue(city);

  if (!cleanService || !cleanName || !cleanPhone || !cleanCity) {
    bot.sendMessage(chatId, "Invalid input values. Please make sure all fields are correctly formatted.");
    return;
  }

  const key = `${cleanCity.toLowerCase()}_${cleanService.toLowerCase()}`;
  const value = `${cleanName}, ${cleanPhone}`;

  try {
    const result = await redis.sadd(key, value);

    if (result === 1) {
      bot.sendMessage(chatId, `Added ${cleanName} (${cleanService}) in ${cleanCity} with phone number ${cleanPhone}.`);
    } else if (result === 0) {
      bot.sendMessage(chatId, `${cleanName} is already listed under ${cleanService} in ${cleanCity}.`);
    } else {
      bot.sendMessage(chatId, "Unexpected result when adding provider.");
    }
  } catch (err) {
    console.error('Error adding provider:', err);
    bot.sendMessage(chatId, "An error occurred while adding the service provider.");
  }
}

module.exports = { handleFind, handleAdd };
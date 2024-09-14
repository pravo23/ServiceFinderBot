const {
  validateIndianPhoneNumber,
  parsePhoneNumber,
  validateService,
  validateCity,
  parseValue,
} = require('./validation');
const redis = require('../config/redis');

async function handleFind(bot, msg, match) {
  const chatId = msg.chat.id;
  let input = match[1].trim();

  input = input.replace(/\s{2,}/g, ' ');

  const parts = input.split(' in ');

  if (parts.length !== 2) {
    bot.sendMessage(
      chatId,
      'Please provide the correct format: /find <service> in <city>'
    );
    return;
  }

  const [service, city] = parts;

  const parsedService = parseValue(service);
  const parsedCity = parseValue(city);

  if (!parsedService || !parsedCity) {
    bot.sendMessage(
      chatId,
      'Invalid input values. Please make sure both service and city are correctly formatted.'
    );
    return;
  }

  const key = `${parsedCity.toLowerCase()}_${parsedService.toLowerCase()}`;

  try {
    const providers = await redis.smembers(key);

    if (providers.length > 0) {
      const providerList = providers
        .map((provider, index) => `${index + 1}. ${provider}`)
        .join('\n');
      bot.sendMessage(
        chatId,
        `Here are the ${parsedService} providers in ${parsedCity}:\n\n${providerList}`
      );
    } else {
      bot.sendMessage(
        chatId,
        `No ${parsedService} providers found in ${parsedCity}.`
      );
    }
  } catch (err) {
    console.error('Error fetching providers:', err);
    bot.sendMessage(
      chatId,
      'An error occurred while fetching the service providers.'
    );
  }
}

async function handleAdd(bot, msg, match) {
  const chatId = msg.chat.id;
  let input = match[1].trim();

  input = input.replace(/\s{2,}/g, ' ');

  const parts = input.split(' with ');

  if (parts.length !== 2) {
    bot.sendMessage(
      chatId,
      'Please provide the correct format: /add <service> <name> with <phone> in <city>'
    );
    return;
  }

  const [serviceAndName, phoneAndCity] = parts;
  const phoneCityParts = phoneAndCity.split(' in ');

  if (phoneCityParts.length !== 2) {
    bot.sendMessage(
      chatId,
      'Please provide the correct format: /add <service> <name> with <phone> in <city>'
    );
    return;
  }

  const [phone, city] = phoneCityParts;
  const [service, name] = serviceAndName.split(' ');

  const parsedService = parseValue(service);
  const parsedName = parseValue(name);
  const parsedPhone = parsePhoneNumber(phone);
  const parsedCity = parseValue(city);

  if (!validateService(parsedService)) {
    bot.sendMessage(
      chatId,
      'Invalid service name. Please use one of the common services.'
    );
    return;
  }

  if (!validateIndianPhoneNumber(parsedPhone)) {
    bot.sendMessage(chatId, 'Invalid phone number format.');
    return;
  }

  if (!validateCity(parsedCity)) {
    bot.sendMessage(chatId, 'Invalid city name format.');
    return;
  }

  const key = `${parsedCity.toLowerCase()}_${parsedService.toLowerCase()}`;
  const value = `${parsedName}, ${'+91' + parsedPhone}`;

  try {
    const result = await redis.sadd(key, value);

    if (result === 1) {
      bot.sendMessage(
        chatId,
        `Added ${parsedName} (${parsedService}) in ${parsedCity} with phone number ${parsedPhone}.`
      );
    } else if (result === 0) {
      bot.sendMessage(
        chatId,
        `${parsedName} is already listed under ${parsedService} in ${parsedCity}.`
      );
    } else {
      bot.sendMessage(chatId, 'Unexpected result when adding provider.');
    }
  } catch (err) {
    console.error('Error adding provider:', err);
    bot.sendMessage(
      chatId,
      'An error occurred while adding the service provider.'
    );
  }
}

module.exports = { handleFind, handleAdd };

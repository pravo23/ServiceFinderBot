const { COMMON_SERVICES, CITY_NAME_REGEX } = require('../constants');

function validatePhoneNumber(phone) {
  // Remove any non-numeric characters except for the leading '+'
  const cleanedPhone = phone.replace(/^\+/, '').replace(/\D/g, '');
  
  // Check if phone number length is between 10 and 12 digits
  return /^\d{10}$/.test(cleanedPhone);
}

function validateService(service) {
  return COMMON_SERVICES.includes(service.toLowerCase());
}

function validateCity(city) {
  return CITY_NAME_REGEX.test(city);
}

function cleanValue(value) {
  let cleaned = value.trim();
  cleaned = cleaned.replace(/[^a-zA-Z0-9\s]/g, '');
  return cleaned;
}

module.exports = { validatePhoneNumber, validateService, validateCity, cleanValue };
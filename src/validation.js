const { COMMON_SERVICES, CITY_NAME_REGEX } = require('../constants');

function parsePhoneNumber(phoneNumber) {
  phoneNumber = phoneNumber.replace(/[\s-()]/g, '');
  // Remove +91, 91, or leading 0
  phoneNumber = phoneNumber.replace(/^(\+91|91|0)/, '');

  return phoneNumber;
}

function validateIndianPhoneNumber(phoneNumber) {
  phoneNumber = parsePhoneNumber(phoneNumber);
  const indianPhoneRegex = /^[6-9]\d{9}$/;

  return indianPhoneRegex.test(phoneNumber);
}

function validateService(service) {
  return COMMON_SERVICES.includes(service.toLowerCase());
}

function validateCity(city) {
  return CITY_NAME_REGEX.test(city);
}

function parseValue(value) {
  let parsed = value.trim();
  return parsed.replace(/[^a-zA-Z0-9\s]/g, '');
}

module.exports = {
  validateIndianPhoneNumber,
  parsePhoneNumber,
  validateService,
  validateCity,
  parseValue,
};

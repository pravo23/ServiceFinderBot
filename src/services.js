const redis = require('../config/redis');

// Add provider to Redis
async function addProvider(city, service, provider) {
  const key = `${city}:${service}`;
  await redis.rpush(key, provider);
}

// Find providers from Redis
async function findProviders(city, service) {
  const key = `${city}:${service}`;
  return redis.lrange(key, 0, -1);
}

module.exports = { addProvider, findProviders };
const Redis = require('ioredis');
require('dotenv').config();

const client = new Redis({
  host: process.env.REDIS_HOST || '127.0.0.1',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || '',
});

client.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = client;
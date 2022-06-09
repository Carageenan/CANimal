require("dotenv").config();
const Redis = require("ioredis");

const redis = new Redis({
  port: 18938, // RedisLab port
  host: "redis-18938.c295.ap-southeast-1-1.ec2.cloud.redislabs.com", // RedisLab host
  password: process.env.REDIS_PASSWORD, // RedisLab password
});

module.exports = redis;

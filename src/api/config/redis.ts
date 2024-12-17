import { config } from 'dotenv';
import Redis from 'ioredis';
config();
export const redis = new Redis(process.env.REDIS_URL!);


redis.on('error', err => console.log('Redis Client Error', err));

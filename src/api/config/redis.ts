import { createClient } from 'redis';
import { config } from 'dotenv';

config();

export const client = createClient({
    url: process.env.REDIS_URL
});


client.connect().catch(err => console.log('error connecting to Redis:', err));


client.on('error', err => console.log('Redis Client Error', err));

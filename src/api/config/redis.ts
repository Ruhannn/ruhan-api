import { createClient } from 'redis';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

export const client = createClient({
    username: process.env.REDIS_DATABASE_USERNAME,
    password: process.env.REDIS_DATABASE_PASSWORD,
    socket: {
        host: process.env.REDIS_DATABASE_HOST,
        port: parseInt(process.env.REDIS_DATABASE_PORT!)
    }
});


client.connect().catch(err => console.log('error connecting to Redis:', err));


client.on('error', err => console.log('Redis Client Error', err));

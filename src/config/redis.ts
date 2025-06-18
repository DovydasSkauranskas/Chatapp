import Redis, { RedisOptions } from 'ioredis';
import 'dotenv/config';

let redis: Redis | null = null;

export function getRedis() {
    if (redis) return redis;

    const options: RedisOptions = {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PASSWORD,
        connectTimeout: 10000,
    }   
    redis = new Redis(options);
    return redis;
}

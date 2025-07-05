import { getRedis } from "../config/redis";

export async function getMessages() {
    try {
        const redis = getRedis();
        const redisFetch = await redis.lrange('messages', 0, -1);
        const messages = redisFetch.map((message: string) => JSON.parse(message));
        return { success: true, data: messages }
    } catch (error) {
        console.log('Error retriving messages: ', error);
        return { success: false, data: []};
    }
}
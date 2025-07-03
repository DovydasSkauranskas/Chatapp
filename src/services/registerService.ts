import { getRedis } from "../config/redis";
import { User } from "./types";
export async function register(userName: string) {
    try {
        const redis = getRedis();
        const redisFetch = await redis.lrange('users', 0, -1) || '[]';
        const existingUsers: User[] = redisFetch.map((user) => JSON.parse(user));
    
        if (existingUsers.some((user: User) => user.userName == userName)) 
            return {success: false, message: 'Username is taken'};
    
        redis.lpush('users', JSON.stringify({userName: userName}));
    
        return { success: true };
    } catch (error) {
        console.log('Error in registerService: ', error);
        return { success: false, message: 'Error while registering' }
    }
}

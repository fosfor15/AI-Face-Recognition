import jwt from 'jsonwebtoken';
import { createClient } from 'redis';


const redisClient = createClient({
    url: process.env.REDIS_URL
});

redisClient.on('connect', () => console.log('Redis client is connected'));
redisClient.on('error', error => console.log('Redis client Error', error));

redisClient.connect();


export const createToken = (email) => {
    const jwtPayload = { email };
    const jwtOptions = { expiresIn: 86_400 };

    return jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions);
};

export const createSession = (userId, token) => {
    const cacheOptions = {
        EX: 3600
    };

    return redisClient.set(token, userId, cacheOptions);
};

export const removeSession = (token) => {
    return redisClient.del(token);
};

export const checkSession = (token) => {
    return redisClient.get(token);
};

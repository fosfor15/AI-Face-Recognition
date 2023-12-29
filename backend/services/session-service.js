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
    const jwtOptions = { expiresIn: 3600 };

    return jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions);
};

export const createSession = (userId, token) => {
    const options = {
        EX: 3600
    };

    return redisClient.set(token, userId, options);
};

export const removeSession = (token) => {
    return redisClient.del(token);
};

export const checkSession = (token) => {
    return redisClient.get(token);
};

export const getSessionExpiration = (token) => {
    return redisClient.ttl(token);
};

export const setSessionExpiration = (token, expirationTime) => {
    return redisClient.expire(token, expirationTime, 'XX');
};

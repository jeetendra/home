import { createClient } from 'redis';

const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;

const redisClient = createClient({
    url: `redis://${HOST}:${PORT}`
});

async function init() {
    await redisClient.connect();
}

init();    
  
redisClient.on('error', err => console.log('Redis Client Error', err))

export async function getCache(cacheKey) {
    console.log("Fetching data from cache");
    const cacheValue = await redisClient.get(cacheKey);
    console.log({cacheValue})
    if(cacheValue) return JSON.parse(cacheValue);
    
    return null;
}

export async function setCache(cacheKey, dbEntry, expiryTime = 60 * 60 * 24) {
    console.log("Saving data to cache")
    redisClient.set(cacheKey, JSON.stringify(dbEntry), { EX: expiryTime});
    
}
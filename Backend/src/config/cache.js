const Redis = require("ioredis").default

let redis = null;
let isRedisConnected = false;

try {
    redis = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
        retryStrategy: () => null,        
        enableOfflineQueue: false,         
        connectTimeout: 5000,
        lazyConnect: true                  
    })

    redis.on("connect", () => {
        isRedisConnected = true;
        console.log("Server is connected to Redis")
    }) 

    redis.on("error", () => {
        isRedisConnected = false;

    })
} catch(err) {
    console.log("Redis not available, running without cache")
}

const safeRedis = {
    get: async (key) => {
        if (!isRedisConnected || !redis) return null;
        try { return await redis.get(key) } 
        catch { return null }
    },
    set: async (key, value, ...args) => {
        if (!isRedisConnected || !redis) return null;
        try { return await redis.set(key, value, ...args) } 
        catch { return null }
    }
}

module.exports = safeRedis;
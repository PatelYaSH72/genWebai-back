import Redis from "ioredis"

const redis = new Redis(process.env.REDIS_URL, {
  tls: process.env.REDIS_URL?.startsWith('rediss://') 
    ? { rejectUnauthorized: false } 
    : undefined
});

redis.on("connect",()=>{
  console.log("Redis Connected")
})

redis.on("error",(err)=>{
  console.log("Redis error",err);
});

export default redis;
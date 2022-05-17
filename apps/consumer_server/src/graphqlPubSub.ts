import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";
import config from "@/config";

const dateReviver = (key, value) => {
    const isISO8601Z = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/;
    if (typeof value === "string" && isISO8601Z.test(value)) {
        const tempDateNumber = Date.parse(value);
        if (!isNaN(tempDateNumber)) {
            return new Date(tempDateNumber);
        }
    }
    return value;
};

export const myRedisClient = new Redis("redis://:redisPassword@127.0.0.1:6379/1");

export const pubSub = new RedisPubSub({
    reviver: dateReviver,
    publisher: myRedisClient,
    subscriber: myRedisClient,
});

export default pubSub;

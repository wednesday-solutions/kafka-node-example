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

export const pubSub = new RedisPubSub({
    reviver: dateReviver,
    publisher: new Redis(config.env.REDIS_URI),
    subscriber: new Redis(config.env.REDIS_URI),
});

export default pubSub;

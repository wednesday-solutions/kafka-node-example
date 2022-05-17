import { Options } from "@mikro-orm/core";
import { RedisCacheAdapter } from "mikro-orm-cache-adapter-redis";
import Redis from "ioredis";
import config from "@/config";

export const myRedisClient = new Redis(config.env.REDIS_URI);

export const ormConfig: Options = {
    entities: ["dist/**/*.entity.js"],
    entitiesTs: ["src/**/*.entity.ts"],
    user: config.postgres.user,
    password: config.postgres.password,
    dbName: config.postgres.dbName,
    host: config.postgres.host,
    port: config.postgres.port,
    type: "postgresql",
    debug: config.env.isDev,
    migrations: {
        path: "./src/migrations",
        tableName: "migrations",
        transactional: true,
        disableForeignKeys: false,
    },
    resultCache: {
        adapter: RedisCacheAdapter,
        expiration: 60 * 1000,
        options: {
            client: myRedisClient,
        },
    },
};

export default ormConfig;

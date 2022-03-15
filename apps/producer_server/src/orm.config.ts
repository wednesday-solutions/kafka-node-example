import { Options, EntityManager } from "@mikro-orm/core";
import config from "@/config";

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
    schema: "public",
    migrations: {
        path: "./dist/migrations",
        pathTs: "./src/migrations",
        tableName: "migrations",
        transactional: true,
    },
};

export default ormConfig;

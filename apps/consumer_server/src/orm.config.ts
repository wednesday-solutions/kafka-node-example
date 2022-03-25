import { Options } from "@mikro-orm/core";
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
    migrations: {
        path: "./src/migrations",
        tableName: "migrations",
        transactional: true,
        disableForeignKeys: false,
    },
};

export default ormConfig;

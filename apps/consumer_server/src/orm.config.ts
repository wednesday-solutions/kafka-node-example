import { AsyncLocalStorage } from "async_hooks";
import { Options, EntityManager } from "@mikro-orm/core";
// import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import config from "@/config";

const storage = new AsyncLocalStorage<EntityManager>();

export const ormConfig: Options = {
    // metadataProvider: TsMorphMetadataProvider,
    context: () => storage.getStore(),
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
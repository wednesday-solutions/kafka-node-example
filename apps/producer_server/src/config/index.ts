import { cleanEnv, str, email, port, bool, url } from "envalid";
import { config } from "envars";

config({ env: process.env.NODE_ENV || "development" });

const env = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ["development", "test", "production", "staging"],
    }),
    API_PORT: port({ default: 6000 }),
    DOMAIN: url({ default: "http://localhost" }),
    ADMIN_EMAIL: email({ default: "admin@example.com" }),
    POSTGRES_USER: str({ default: "postgres" }),
    POSTGRES_PASSWORD: str({ default: "postgres" }),
    POSTGRES_HOST: str({ default: "localhost" }),
    POSTGRES_PORT: port({ default: 5432 }),
    POSTGRES_DB: str({ default: "test_db" }),
    REDIS_HOST: str({ default: "127.0.0.1" }),
    TOKEN_SECRET: str({ default: "definitely_not_a_secret_string" }),
    KAFKA_CLIENT_ID: str(),
    KAFKA_HOSTS: str(),
});

export default {
    env,
    api: {
        domain: env.DOMAIN,
        port: env.API_PORT,
    },
    postgres: {
        user: env.POSTGRES_USER,
        password: env.POSTGRES_PASSWORD,
        host: env.POSTGRES_HOST,
        port: env.POSTGRES_PORT,
        dbName: env.POSTGRES_DB,
    },
    kafka: {
        hosts: env.KAFKA_HOSTS.split(","),
        topic: "new-post",
    },
};

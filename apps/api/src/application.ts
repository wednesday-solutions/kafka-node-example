import { Server } from "http";
import Fastify, { FastifyInstance } from "fastify";
// plugins
import mercurius from "mercurius";
import mercuriusUpload from "mercurius-upload";
import prettifier from "@mgcrea/pino-pretty-compact";
import GracefulServer from "@gquittet/graceful-server";

import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Producer } from "kafkajs";
import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

import { getContext } from "@/utils/interfaces/context.interface";
import config from "@/config";
import connectDatabase from "@/connectDatabase";
import { connectKafka } from "@/connectKafka";

const _importDynamic = new Function("modulePath", "return import(modulePath)");

const options: Redis.RedisOptions = {
    host: config.env.REDIS_HOST,
    retryStrategy: (times) => Math.max(times * 100, 3000),
};

const pubSub = new RedisPubSub({
    publisher: new Redis(options),
    subscriber: new Redis(options),
});

export class Application {
    public instance: FastifyInstance;
    public orm!: MikroORM<IDatabaseDriver<Connection>>;
    public server!: Server;
    public gracefulServer: any;
    public appDomain: string = config.api.domain;
    public appPort: number = config.api.port;
    public kafkaProducer!: Producer;

    public constructor() {
        this.instance = Fastify({
            logger: { prettyPrint: config.env.isDev, prettifier },
            ignoreTrailingSlash: true,
            trustProxy: ["127.0.0.1"],
        });

        // this.instance.register(authService);

        this.gracefulServer = GracefulServer(this.instance.server);
        this.makeApiGraceful();
        this.routes();
    }

    public async init() {
        await this.initializeGraphql();

        const fastifyPrintRoutes = await _importDynamic("fastify-print-routes");
        this.instance.register(fastifyPrintRoutes);
        this.instance.listen(this.appPort, (error) => {
            if (error) {
                this.orm.close();
                this.instance.log.error(error);
                process.exit(1);
            }
            this.gracefulServer.setReady();
        });
    }

    private async initializeGraphql() {
        const schema: GraphQLSchema = await buildSchema({
            resolvers: [`${__dirname}/**/*.resolver.{ts,js}`],
            dateScalarMode: "isoDate",
            pubSub,
        });

        this.instance.register(mercurius, {
            schema,
            graphiql: true,
            ide: true,
            path: "/graphql",
            allowBatchedQueries: true,
            context: (request) => getContext(request, this.orm.em.fork(), this.kafkaProducer),
        });
        this.instance.register(mercuriusUpload, {
            maxFileSize: 1000000,
            maxFiles: 10,
        });
    }

    private routes() {
        this.instance.get("/", async (_request, _reply) => {
            return { message: "God speed" };
        });
    }

    private makeApiGraceful() {
        this.gracefulServer.on(GracefulServer.READY, async () => {
            this.instance.log.info(`Server is running on ${this.appDomain}:${this.appPort} 🌟👻`);
            this.orm = await connectDatabase();
            this.kafkaProducer = await connectKafka();
            console.log(this.kafkaProducer);
        });

        this.gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
            this.instance.log.warn("Server is shutting down");
        });

        this.gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
            this.instance.log.error("Server is down because of", error.message);
        });
    }
}

export default Application;

import { Server } from "http";
import * as path from "path";
import Fastify, { FastifyInstance } from "fastify";
// plugins
import { bootstrap } from "fastify-decorators";
import mercurius from "mercurius";
import mercuriusUpload from "mercurius-upload";
import prettifier from "@mgcrea/pino-pretty-compact";
import GracefulServer from "@gquittet/graceful-server";
import fastifyCors from "fastify-cors";

import { Connection, IDatabaseDriver, MikroORM, EntityManager } from "@mikro-orm/core";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";

import { getContext } from "@/utils/interfaces";
import config from "@/config";
import connectDatabase from "@/connectDatabase";
import pubSub from "@/graphqlPubSub";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const DI = {} as { em: EntityManager };

export class Application {
    public fastify: FastifyInstance;
    public orm!: MikroORM<IDatabaseDriver<Connection>>;
    public server!: Server;
    public gracefulServer: any;
    public appDomain: string = config.api.domain;
    public appPort: number = config.api.port;
    // public kafkaConsumer!: Consumer;

    public constructor(port = config.api.port) {
        this.appPort = port;
        this.fastify = Fastify({
            logger: config.env.isTest ? false : { prettyPrint: config.env.isDev, prettifier },
            ignoreTrailingSlash: true,
            trustProxy: ["127.0.0.1"],
        });
        this.gracefulServer = GracefulServer(this.fastify.server);
        this.makeApiGraceful();
        this.routes();
    }

    public async init() {
        this.fastify.register(fastifyCors);
        this.fastify.register(bootstrap, {
            directory: path.resolve(__dirname, `controllers`),
            mask: /\.controller\./,
        });
        this.fastify.addContentTypeParser(
            "application/cloudevents+json",
            { parseAs: "string" },
            (req, body, done) => {
                if (typeof body === "string") {
                    done(null, JSON.parse(body));
                } else {
                    done(null, body);
                }
            }
        );
        this.orm = await connectDatabase();
        DI.em = this.orm.em.fork();

        // const { consumer, pubsub } = await connectKafkaConsumer();
        // this.kafkaConsumer = consumer;
        // this.kafkaPubSub = pubsub;
        await this.initializeGraphql();

        this.server = this.fastify.server;
        try {
            await this.fastify.listen(this.appPort);
            this.gracefulServer.setReady();
        } catch (error) {
            await this.destroy();
            this.fastify.log.error(error);
            process.exit(1);
        }

        return { pubSub };
    }

    public async destroy() {
        // await this.kafkaConsumer.disconnect();
        await this.fastify.close();
        if (this.orm.isConnected) {
            await this.orm.close();
        }

        await pubSub.close();
    }

    private async initializeGraphql() {
        const schema: GraphQLSchema = await buildSchema({
            resolvers: [`${__dirname}/**/*.resolver.{ts,js}`],
            dateScalarMode: "isoDate",
            pubSub,
            emitSchemaFile: true,
        });

        this.fastify.register(mercurius, {
            schema,
            graphiql: true,
            ide: true,
            path: "/graphql",
            allowBatchedQueries: true,
            context: (request) => getContext(request, this.orm.em.fork()),
            subscription: {
                onConnect: (data) => {
                    console.log("Websocket Client Connected");
                    return data;
                },
            },
        });
        this.fastify.register(mercuriusUpload, {
            maxFileSize: 1000000,
            maxFiles: 10,
        });
    }

    private routes() {
        this.fastify.get("/", async (_request, _reply) => {
            return { message: "God speed" };
        });
    }

    private makeApiGraceful() {
        this.gracefulServer.on(GracefulServer.READY, async () => {
            this.fastify.log.info(`Server is running on ${this.appDomain}:${this.appPort} 🌟👻`);
        });

        this.gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
            this.fastify.log.warn("Server is shutting down");
            this.orm.close();
        });

        this.gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
            this.fastify.log.error("Server is down because of", error.message);
            this.orm.close();
        });
    }
}

export default Application;

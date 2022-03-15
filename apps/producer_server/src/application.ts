import { Server } from "http";
import Fastify, { FastifyInstance } from "fastify";
// plugins
import mercurius from "mercurius";
import mercuriusUpload from "mercurius-upload";
import prettifier from "@mgcrea/pino-pretty-compact";
import GracefulServer from "@gquittet/graceful-server";
import fastifyCors from "fastify-cors";
import { Connection, IDatabaseDriver, MikroORM } from "@mikro-orm/core";
import { GraphQLSchema } from "graphql";
import { buildSchema } from "type-graphql";
import { Producer } from "kafkajs";

import { getContext } from "@/utils/interfaces/context.interface";
import config from "@/config";
import { DBService } from "@/services/DBService";
import { KafkaProducer } from "@/services/MQService";

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
            logger: config.env.isTest ? false : { prettyPrint: config.env.isDev, prettifier },
            ignoreTrailingSlash: true,
            trustProxy: ["127.0.0.1"],
        });
        this.gracefulServer = GracefulServer(this.instance.server);
        this.makeApiGraceful();
        this.routes();
    }

    public async init() {
        this.instance.register(fastifyCors);
        await this.initializeGraphql();
        this.orm = await new DBService().init();
        this.kafkaProducer = await new KafkaProducer().init();

        this.server = this.instance.server;
        this.instance.listen(this.appPort, (error) => {
            if (error) {
                this.orm.close();
                this.kafkaProducer.disconnect();
                this.instance.log.error(error);

                process.exit(1);
            }
            this.gracefulServer.setReady();
        });

        return this.instance;
    }

    private async initializeGraphql() {
        const schema: GraphQLSchema = await buildSchema({
            resolvers: [`${__dirname}/**/*.resolver.{ts,js}`],
            dateScalarMode: "isoDate",
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
        });

        this.gracefulServer.on(GracefulServer.SHUTTING_DOWN, () => {
            this.orm.close();
            this.kafkaProducer.disconnect();
            this.instance.log.warn("Server is shutting down");
        });

        this.gracefulServer.on(GracefulServer.SHUTDOWN, (error) => {
            this.orm.close();
            this.kafkaProducer.disconnect();
            this.instance.log.error("Server is down because of", error.message);
        });
    }
}

export default Application;

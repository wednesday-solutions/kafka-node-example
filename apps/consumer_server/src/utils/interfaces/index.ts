import { RequestGenericInterface } from "fastify";

export interface DaprRequestInterface extends RequestGenericInterface {
    Body: {
        data: Object;
    };
}

export * from "./context.interface";

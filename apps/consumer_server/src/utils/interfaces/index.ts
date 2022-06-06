import { RequestGenericInterface } from "fastify";

export * from "./context.interface";

export interface DaprRequestBody extends RequestGenericInterface {
    Body: {
        data: Object;
    };
}

export interface NewPostRequestBody extends RequestGenericInterface {
    Body: {
        data: {
            id: string;
            createdAt: string;
            title: string;
            userName: string;
        };
    };
}

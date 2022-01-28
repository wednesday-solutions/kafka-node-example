import { FastifyRequest } from "fastify";
import { MercuriusContext } from "mercurius";
import { EntityManager } from "@mikro-orm/core";
export interface ExtraContext {
    request: FastifyRequest;
    em: EntityManager;
}

export interface MyContext extends MercuriusContext, ExtraContext {}

export const getContext = (request: FastifyRequest, em: EntityManager): ExtraContext => {
    return { request, em };
};

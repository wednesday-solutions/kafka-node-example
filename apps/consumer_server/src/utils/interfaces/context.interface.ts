import { FastifyRequest } from "fastify";
import { MercuriusContext } from "mercurius";
import { EntityManager } from "@mikro-orm/core";
import type { Consumer } from "kafkajs";

export interface ExtraContext {
    request: FastifyRequest;
    em: EntityManager;
    kafkaConsumer?: Consumer;
}

export interface MyContext extends MercuriusContext, ExtraContext {}

export const getContext = (
    request: FastifyRequest,
    em: EntityManager,
    kafkaConsumer?: Consumer
): ExtraContext => {
    return { request, em, kafkaConsumer };
};

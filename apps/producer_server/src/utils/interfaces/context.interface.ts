import { FastifyRequest } from "fastify";
import { MercuriusContext } from "mercurius";
import { EntityManager } from "@mikro-orm/core";
import type { Producer } from "kafkajs";
export interface ExtraContext {
    request: FastifyRequest;
    em: EntityManager;
    kafkaProducer: Producer;
}

export interface MyContext extends MercuriusContext, ExtraContext {}

export const getContext = (
    request: FastifyRequest,
    em: EntityManager,
    kafkaProducer: Producer
): ExtraContext => {
    return { request, em, kafkaProducer };
};

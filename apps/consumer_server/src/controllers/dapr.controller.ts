import { FastifyReply, FastifyRequest } from "fastify";
import { Controller, GET, POST } from "fastify-decorators";
import { DaprRequestBody, NewPostRequestBody } from "@/utils/interfaces";
import { Post } from "@/components/Post";
import config from "@/config";
import { DI } from "@/application";
import pubSub from "@/graphqlPubSub";

@Controller({ route: "/" })
export default class DaprController {
    @GET({ url: "/dapr/subscribe" })
    public async daprSubscribeHandler() {
        return [
            { pubsubname: "kafka-pubsub", topic: "orders", route: "checkout" },
            {
                pubsubname: "kafka-pubsub",
                topic: "newPost",
                route: "new-post",
            },
        ];
    }

    @POST({ url: "/checkout" })
    public async checkoutHandler(request: FastifyRequest<DaprRequestBody>) {
        console.log("CHECKOUT:", request.body.data);
        return {};
    }

    @POST({ url: "/new-post" })
    public async newPostHandler(request: FastifyRequest<NewPostRequestBody>) {
        console.log("NEW_POST:", request.body.data);
        const { id, ...rest } = request.body.data;
        const post = new Post({ ...rest });

        await DI.em.persist(post).flush();
        await pubSub.publish(config.graphqlChannels.NEW_POST, post);

        return {};
    }
}

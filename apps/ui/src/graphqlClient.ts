import {
    createClient,
    dedupExchange,
    fetchExchange,
    cacheExchange,
    subscriptionExchange,
} from "urql";
import { createClient as createWSClient } from "graphql-ws";
import config from "@/config";

const wsClient = createWSClient({
    url: `ws://${config.apiHosts.api_2}/graphql`,
});

const client = createClient({
    url: `${config.env.API_BASE_URL2}/graphql`,
    suspense: true,
    exchanges: [
        dedupExchange,
        cacheExchange,
        fetchExchange,
        subscriptionExchange({
            forwardSubscription: (operation) => ({
                subscribe: (sink) => {
                    return { unsubscribe: wsClient.subscribe(operation, sink) };
                },
            }),
        }),
    ],
});

export default client;

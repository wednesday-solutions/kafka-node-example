// https://speckle.systems/blog/testing-gql-subs/
import { createClient } from "graphql-ws";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { execute } from "@apollo/client";
import * as ws from "ws";
import { DocumentNode } from "graphql";

const getWSClient = (port: number) => {
    return createClient({
        url: `ws://localhost:${port}/graphql`,
        webSocketImpl: ws.WebSocket,
    });
};

export const createSubscriptionObservable = (port: number, query: DocumentNode) => {
    const link = new GraphQLWsLink(getWSClient(port));

    return execute(link, { query: query });
};

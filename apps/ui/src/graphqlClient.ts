import { createClient, dedupExchange, fetchExchange, cacheExchange } from "urql";
import config from "@/config";

const client = createClient({
    url: `${config.env.API_BASE_URL}/graphql`,
    suspense: true,
    exchanges: [dedupExchange, cacheExchange, fetchExchange],
});

export default client;

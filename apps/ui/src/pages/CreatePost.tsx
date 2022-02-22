import React from "react";
import Container from "@mui/material/Container";
import { Provider, createClient, dedupExchange, fetchExchange, cacheExchange } from "urql";
import config from "@/config";
import CreatePostForm from "components/CreatePostForm";

const client = createClient({
    url: `${config.env.API_BASE_URL1}/graphql`,
    suspense: true,
    // exchanges: [dedupExchange, cacheExchange, fetchExchange],
});

export default function CreatePosts() {
    // return <div style={{ display: "grid", placeItems: "center" }}>Hello world</div>;
    return (
        <Provider value={client}>
            <Container>
                <CreatePostForm />
            </Container>
        </Provider>
    );
}

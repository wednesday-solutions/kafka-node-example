import React from "react";
import Container from "@mui/material/Container";
import { Provider, createClient } from "urql";
import config from "@/config";
import CreatePostForm from "components/CreatePostForm";

const client = createClient({
    url: `${config.env.API_BASE_URL1}/graphql`,
    suspense: true,
    fetchOptions: () => {
        return {
            headers: {},
        };
    },
});

export default function CreatePosts() {
    return (
        <Provider value={client}>
            <Container>
                <CreatePostForm />
            </Container>
        </Provider>
    );
}

import React from "react";
import Container from "@mui/material/Container";
import { Provider } from "urql";
import Card from "components/Card";
import graphqlClient from "@/graphqlClient";

export default function Home() {
    return (
        <Provider value={graphqlClient}>
            <Container>
                <Card />
            </Container>
        </Provider>
    );
}

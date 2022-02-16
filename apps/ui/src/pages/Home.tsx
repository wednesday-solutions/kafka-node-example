import React from "react";
import Container from "@mui/material/Container";
import AppBar from "components/AppBar";
import Card from "components/Card";

export default function Home() {
    return (
        <div>
            <AppBar />
            <Container>
                <Card />
            </Container>
        </div>
    );
}

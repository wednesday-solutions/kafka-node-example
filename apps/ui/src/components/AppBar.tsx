import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "@/components/Link";

const pages = [
    { to: "/", title: "Read Posts" },
    { to: "/create", title: "Create Post" },
];

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="transparent" position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ paddingRight: "1rem" }}>
                        Node Kafka
                    </Typography>

                    {pages.map((page) => (
                        <Box component="div" key={page.title} sx={{ paddingRight: "1rem" }}>
                            <Link to={page.to}>{page.title}</Link>
                        </Box>
                    ))}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

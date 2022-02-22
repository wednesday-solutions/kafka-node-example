import React, { Suspense, ReactElement } from "react";
import { Outlet, ReactLocation, Router } from "react-location";
import type { Route, DefaultGenerics } from "react-location";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SnackbarProvider } from "notistack";
import theme from "@/theme";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Create from "@/pages/CreatePost";
import AppBar from "components/AppBar";

const routes: Route<DefaultGenerics>[] = [
    { path: "/", element: <Home /> },
    { path: "/create", element: <Create /> },
];
// Set up a ReactLocation instance
const location = new ReactLocation();

function App(): ReactElement {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return (
        <ErrorBoundary>
            <SnackbarProvider maxSnack={3}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Suspense fallback={<LinearProgress />}>
                        <Router location={location} routes={routes}>
                            <AppBar />
                            <Outlet /> {/* Start rendering router matches */}
                        </Router>
                    </Suspense>
                </ThemeProvider>
            </SnackbarProvider>
        </ErrorBoundary>
    );
}

export default App;

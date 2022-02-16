import React, { Suspense, ReactElement } from "react";
import { Outlet, ReactLocation, Router } from "react-location";
import LinearProgress from "@mui/material/LinearProgress";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { SnackbarProvider } from "notistack";
import theme from "./theme";
import Home from "./pages/Home";
import ErrorBoundary from "@/components/ErrorBoundary";

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
                        <Router location={location} routes={[{ path: "/", element: <Home /> }]}>
                            <Outlet /> {/* Start rendering router matches */}
                        </Router>
                    </Suspense>
                </ThemeProvider>
            </SnackbarProvider>
        </ErrorBoundary>
    );
}

export default App;

import React, { ReactElement, ReactNode } from "react";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material";
import { Link as RouterLink } from "react-location";

interface LinkRouterProps {
    to: string;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

export default function LinkRouter({ children, to, ...props }: LinkRouterProps): ReactElement {
    return (
        <Link underline="none" component={RouterLink} to={to} {...props}>
            {children}
        </Link>
    );
}

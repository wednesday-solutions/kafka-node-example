import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import checker from "vite-plugin-checker";
import istanbul from "vite-plugin-istanbul";

// https://vitejs.dev/config/
export default defineConfig(() => ({
    build: {
        sourcemap: true,
    },
    define: {
        "process.env": process.env,
    },
    envDir: "./env",
    plugins: [
        react(),
        tsconfigPaths(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
            },
        }),
        istanbul({
            cypress: true,
            include: "src/*",
        }),
    ],
}));

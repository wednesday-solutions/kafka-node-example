module.exports = {
    ...require("config/eslint-preset"),
    env: {
        // Your environments (which contains several predefined global variables)
        browser: true,
        node: true,
        jest: true,
    },
    ignorePatterns: ["vite-env.d.ts", "*.config.js", "*.config.ts", "cypress/*"],
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
};

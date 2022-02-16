module.exports = {
    ...require("config/eslint-preset"),
    env: {
        // Your environments (which contains several predefined global variables)
        browser: true,
        node: true,
        jest: true,
    },
    ignorePatterns: ["vite-env.d.ts"],
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
};

module.exports = {
    ...require("config/eslint-preset"),
    ignorePatterns: [
        "**/migrations/*.ts",
        "dist/*",
        "**/*.config.js",
        ".eslintrc.js",
        "**/global-*.js",
        "**/*-hook.js",
        "__mocks__",
    ],
    env: {
        // Your environments (which contains several predefined global variables)
        // browser: true,
        node: true,
        // mocha: true,
        jest: true,
    },
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
};

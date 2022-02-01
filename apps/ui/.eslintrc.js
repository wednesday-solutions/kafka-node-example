module.exports = {
    ...require("config/eslint-preset"),
    env: {
        // Your environments (which contains several predefined global variables)
        browser: true,
        // node: true,
        // mocha: true,
        jest: true,
    },
    globals: {
        // Your global variables (setting to false means it's not allowed to be reassigned)
        //
        // myGlobal: false
    },
    rules: {
        // Customize your rules
    },
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.json"],
    },
};

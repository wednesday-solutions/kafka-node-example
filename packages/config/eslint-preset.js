module.exports = {
    extends: ["alloy", "alloy/typescript", "alloy/react"],
    ignorePatterns: ["**/migrations/*.ts", "dist/*", "**/*.config.js"],
    overrides: [
        {
            files: ["*.resolver.ts"],
            rules: {
                "max-params": 0,
            },
        },
    ],
    plugins: ["prettier"],
    settings: {
        react: {
            version: "detect",
        },
    },
};

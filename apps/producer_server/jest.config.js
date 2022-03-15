/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["jest-extended/all"],
    globalSetup: "./test/global-setup.js",
    globalTeardown: "./test/global-teardown.js",
};

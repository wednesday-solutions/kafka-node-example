import "reflect-metadata";
// import { replaceTscAliasPaths } from "tsc-alias";
import { Application } from "@/application";

// replaceTscAliasPaths();

process.on("uncaughtException", (e) => {
    console.error(e);
    process.exit(1);
});

process.on("unhandledRejection", (e) => {
    console.error(e);
    process.exit(1);
});

(() => {
    const app = new Application();
    app.init().catch(console.error);
})();

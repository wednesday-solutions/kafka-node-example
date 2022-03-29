export * from "./dbUtils";
export * from "./createSimpleUuid";
export * from "./graphqlWSClient";

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

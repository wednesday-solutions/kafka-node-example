export default {
    env: {
        API_BASE_URL1: process.env.API_BASE_URL1 || "http://localhost:7000",
        API_BASE_URL2: process.env.API_BASE_URL2 || "http://localhost:7001",
        NODE_ENV: process.env.NODE_ENV,
    },
    hosts: {
        api_1: "localhost:7000",
        api_2: "localhost:7001",
    },
    graphqlChannels: {
        NEW_POST: "NEW_POST",
    },
};

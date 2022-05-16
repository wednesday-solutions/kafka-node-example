import { DaprClient } from "dapr-client";

class Dapr {
    public client: DaprClient;
    public constructor() {
        const DAPR_HOST = process.env.DAPR_HOST || "http://localhost";
        const DAPR_HTTP_PORT = process.env.DAPR_HTTP_PORT || "3500";

        this.client = new DaprClient(DAPR_HOST, DAPR_HTTP_PORT);
    }

    public async publishNewPost(post) {
        const PUBSUB_NAME = "kafka-pubsub";
        const PUBSUB_TOPIC = "newPost";
        await this.client.pubsub.publish(PUBSUB_NAME, PUBSUB_TOPIC, post);
        console.log("Published data: " + JSON.stringify(post));
    }
}

export default new Dapr();

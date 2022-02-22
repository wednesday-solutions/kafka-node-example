import { Kafka, Consumer } from "kafkajs";
import { KafkaPubSub } from "graphql-kafkajs-subscriptions";
import { DI } from "@/application";
import config from "@/config";
import { Post } from "@/components/Post";

const kafka = new Kafka({
    clientId: config.env.KAFKA_CLIENT_ID,
    brokers: config.kafka.hosts,
    // logLevel: logLevel.WARN,
});

export const connectKafkaConsumer = async (
    groupId = "test-group"
): Promise<{ consumer: Consumer; pubsub: KafkaPubSub }> => {
    const consumer = kafka.consumer({ groupId });

    const pubsub = await KafkaPubSub.create({
        topic: "my-topic",
        kafka: kafka,
        groupIdPrefix: "graphql-subs", // used for kafka pub/sub,
        producerConfig: {}, // optional kafkajs producer configuration
        consumerConfig: {}, // optional kafkajs consumer configuration
    });

    await consumer.connect();
    await consumer.subscribe({ topic: config.kafka.topic });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
            const response = JSON.parse(message.value.toString());
            console.log(response);
            const post = new Post(response);

            await DI.orm.em.persist(post).flush();
            await pubsub.publish(config.graphqlChannels.NEW_POST, message.value);
        },
    });

    return { consumer, pubsub };
};

export default connectKafkaConsumer;

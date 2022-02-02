import { Kafka, Consumer } from "kafkajs";
import config from "@/config";

const kafka = new Kafka({
    clientId: config.env.KAFKA_CLIENT_ID,
    brokers: config.kafka.hosts,
    // logLevel: logLevel.WARN,
});

export const connectKafkaConsumer = async (groupId = "test-group"): Promise<Consumer> => {
    const consumer = kafka.consumer({ groupId });
    await consumer.connect();
    await consumer.subscribe({ topic: config.kafka.topic, fromBeginning: true });
    await consumer.run({
        // eachBatch: async ({ batch }) => {
        //   console.log(batch)
        // },
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
            console.log(JSON.parse(message.value.toString()));
        },
    });
    return consumer;
};

export default connectKafkaConsumer;

import { Kafka, Producer } from "kafkajs";
import config from "@/config";

const kafka = new Kafka({
    clientId: config.env.KAFKA_CLIENT_ID,
    brokers: config.kafka.hosts,
});

export const connectKafka = async (): Promise<Producer> => {
    const producer = kafka.producer();
    await producer.connect();

    return producer;
};

export default connectKafka;

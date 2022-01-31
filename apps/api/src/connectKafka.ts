import { Kafka, Producer } from "kafkajs";

const kafka = new Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"],
});

export const connectKafka = async (): Promise<Producer> => {
    const producer = kafka.producer();
    await producer.connect();

    return producer;
};

export default connectKafka;

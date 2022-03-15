import { Kafka, Producer, logLevel } from "kafkajs";
import config from "../config";

export const kafkaClient = new Kafka({
    clientId: config.env.KAFKA_CLIENT_ID,
    brokers: config.kafka.hosts,
    logLevel: logLevel.WARN,
});

export class KafkaProducer {
    public kafka: Kafka;
    public producer!: Producer;

    public constructor(kafka = kafkaClient) {
        this.kafka = kafka;
    }

    public async init() {
        const producer = this.kafka.producer();
        await producer.connect();

        this.producer = producer;
        return this.producer;
    }

    public async destroy() {
        await this.producer.disconnect();
        this.kafka = null;
        this.producer = null;
    }
}

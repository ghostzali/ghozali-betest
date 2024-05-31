import { KafkaEvent } from '../interfaces';
import { kafkaConfig } from '../config';
import { Kafka, KafkaConfig, Partitioners, Producer } from 'kafkajs';

export namespace KafkaProducerService {
  let kafka: Kafka;
  let producer: Producer;

  function configure() {
    const config: KafkaConfig = {
      brokers: kafkaConfig.brokers,
      clientId: kafkaConfig.clientId,
    };
    if (!kafka) kafka = new Kafka(config);
    producer = kafka.producer({
      retry: { retries: 300 },
      maxInFlightRequests: 5,
      allowAutoTopicCreation: true,
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  }

  export const send = async <T extends object>(topic: string, message: T) => {
    configure();
    try {
      await producer.connect();
      await producer.send({
        topic,
        acks: -1,
        messages: [
          {
            value: JSON.stringify(message),
          },
        ],
      });
    } catch (err) {
      throw err;
    }
  };
}

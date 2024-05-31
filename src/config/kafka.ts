const kafkaConfig = {
  brokers: process.env.KAFKA_BROKER ? process.env.KAFKA_BROKER.split(',') : ['localhost:9092'],
  clientId: process.env.KAFKA_CLIENT_ID || 'producer_ghozali_betest',
  topic: 'kafka_ghozali_betest',
};

export default kafkaConfig;

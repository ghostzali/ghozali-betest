import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectionConfig: mongoose.ConnectOptions = {
  readPreference: 'primaryPreferred',
  connectTimeoutMS: 600000,
  socketTimeoutMS: 600000,
};

function getConnectionUrl() {
  const connectionUrl = process.env.MONGO_CONNECTION_URL;
  if (!connectionUrl) throw new Error('Invalid Database Connection String');

  return connectionUrl;
}

async function connect() {
  await mongoose.connect(getConnectionUrl(), connectionConfig);

  mongoose.Promise = global.Promise;
}

connect().catch((err: unknown) => console.log(`[mongoose] ${err}`));

export default mongoose.connection;

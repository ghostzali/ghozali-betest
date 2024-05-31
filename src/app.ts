import logger from 'morgan';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import v1 from './routes/v1';

const app = express();
app.disable('etag');
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'));
}

app.use(express.json({ limit: '50mb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));

app.get('/', (_, res) => res.status(200).json({ status: 'OK' }));

app.use('/v1', v1);

app.use(errorMiddleware);

export default app;

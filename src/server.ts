import app from './app';
import { dbConnection } from './config';

const PORT = Number(process.env.PORT || 3000);

dbConnection.on('connected', () => {
  app.listen(PORT, () => {
    console.log(`[server] 🚀 Listening at :${PORT}`);
  });
});

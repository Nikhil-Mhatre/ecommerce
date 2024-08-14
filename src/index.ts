process.loadEnvFile();

import Logging from '@src/utils/logging';
import express from 'express';
import cors from 'cors';
import isDbconnected from './db';

const app = express();

app.use(cors());
const PORT = process.env.PORT || 9967;

app.get('/health', (_, res) => {
  res.status(200).json({ message: 'Backend server is healthy' });
});

isDbconnected()
  .then((data) => {
    if (data.status === 'success') {
      Logging.info(data.message);
      return app.listen(PORT, () =>
        Logging.info(`Backend started on PORT: ${PORT}`),
      );
    }
    Logging.error(data.message);
    process.exit(1);
  })
  .catch(() => {
    Logging.error('Unable to start backend server');
    process.exit(1);
  });

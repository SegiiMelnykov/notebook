import express from 'express';

import path from 'path';
import sequelize from './config/db';
import models from './models';
import cors from 'cors';
import errorHandler from './middleware/errorHandlerMiddleware';
import router from './routes';

const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.static(__dirname + './../../front/build/'));

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/api', router);

// Should be the last middleware
app.use(errorHandler);

console.log(__dirname);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname + './../../front/build/index.html')),
);

const start = async () => {
  try {
    await sequelize
      .authenticate()
      .then(() => console.log('Connection has been established successfully.'));
    Object.assign(models, sequelize.models); // fixed ts compiler
    await sequelize
      .sync({ alter: true })
      .then(() => console.log('Database synced'));
    app.listen(PORT, () => console.log(`Listening on port ${PORT}....`));
  } catch (e) {
    console.log(e);
  }
};

start();

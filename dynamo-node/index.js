import express from 'express';
import routes from './routes/index.js';
import config from './config/config.js';
import './init.js'; // Import the initialization script

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.listen(config.port, () => {
  console.log(`listening on port ${config.port}`);
});
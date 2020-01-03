// NPM
import express from 'express';
import config from './config/config';

// Local
import { registerStatsRoutes } from './routes/v1/statistics/stats-routes';
import { registerMeasurementsRoutes } from './routes/v1/measurements/measurements-routes';

const server = express();

// e.g. `curl localhost:8000`
server.get('/', (req, res) => res.send(`${config.SERVER_UP_MSG}`));

// All the routes NEED to be registered here:
registerStatsRoutes(server);
registerMeasurementsRoutes(server);


export default server;
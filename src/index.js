// NPM
import express from 'express';
import * as bodyParser from 'body-parser';

// Local
import routes from './routes';
import PORT from './helpers/get-api-port';
import apiDirectoryMessage from './helpers/api-directory-message';

require('./helpers/uncaught-errors-listener');

// Main app processing starts here
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(routes);

app.listen(PORT, apiDirectoryMessage);

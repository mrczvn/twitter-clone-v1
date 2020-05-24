import express, { urlencoded, json } from 'express';

import './database';
import routes from './routes';
import authorization from './middleware/auth';
import msRequest from './middleware/measure-requests';
import httpError from './middleware/http-errors';

const auth = authorization();
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(auth.initialize());
app.use((req, res, next) => msRequest(req, res, next));

routes(app, auth);
app.use((error, req, res, next) => httpError(error, req, res, next));

export default app;

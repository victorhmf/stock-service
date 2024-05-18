import express from 'express'
import logger from 'morgan'

import indexRouter from '../../interfaces/routes/index.js'
import errorHandler from '../../interfaces/middlewares/errorHandler.js'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.use(errorHandler)

export default app;
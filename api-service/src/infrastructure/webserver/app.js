import express from 'express'
import logger from 'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../../swagger-output.json' assert { type: "json" }
// import swagger from '../../../swagger.js';

import indexRouter from '../../interfaces/routes/index.js'
import errorHandler from '../../interfaces/middlewares/errorHandler.js'

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/', indexRouter);

app.use(errorHandler)

export default app;

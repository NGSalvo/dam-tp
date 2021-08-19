import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './swaggerOptions';

import { router as deviceRouter } from './routes/device.routes';
import { router as measurementRouter } from './routes/measurement.routes';
import { router as solenoidValveRouter } from './routes/solenoidValve.routes';
import { router as irrigationLogRouter } from './routes/irrigation-log.routes';

const specs = swaggerJSDoc(options);
export const app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/devices', deviceRouter);
app.use('/measurements', measurementRouter);
app.use('/solenoidvalves', solenoidValveRouter);
app.use('/irrigation-log', irrigationLogRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));

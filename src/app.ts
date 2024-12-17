import express, { json } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { config } from 'dotenv';
import { checkApiKey, errorHandler, notFound } from './api/middleware';
import router from './api/routes';



config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.json('i love ayaka 😊');
});


app.use('/api', checkApiKey, router);


app.use(notFound);
app.use(errorHandler);

export default app;
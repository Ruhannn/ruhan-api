import express, { json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config } from 'dotenv';
import { checkApiKey, errorHandler, notFound } from './api/middleware';
import router from './api/routes';
import { kamiLogger } from 'kami-logger';



config();

const app = express();


app.use(kamiLogger());
app.use(helmet());
app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.json('😊');
});


app.use('/api', checkApiKey, router);


app.use(notFound);
app.use(errorHandler);

export default app;

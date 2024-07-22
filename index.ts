import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express } from 'express';
import morgan from 'morgan';

// Import all routers
import { CryptoRouter } from './routes';

const app: Express = express();
app.use(bodyParser({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
app.use(cors({
    origin: '*',
}));
app.use(morgan('common'));

// Inject routers
app.use(CryptoRouter);

// Open port to listen on
app.listen(3005);
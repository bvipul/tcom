import express from 'express';
import db from './db';
import cors from 'cors';
import AuthController from './Controllers/AuthController';
import UserController from './Controllers/UserController';

db
    .sync()
    .then(() => {
        console.log("Sync Completed");
    });

const app = express();

app.use(cors());
app.use('/api', AuthController);
app.use('/users', UserController);

export default app;
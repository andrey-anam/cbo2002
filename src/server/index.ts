import express from 'express';
import cors from 'cors';
import createRoutes from '../presentation/route';
import { Db } from 'mongodb';

export default function createApp(db: Db) {
    const app = express();
    
    app.use(express.json())
        .use(cors());
    
    app.get('/ping', async (_req, res) => {
        res.status(200).json({ 'message': 'pong' }).end();
    })
    
    app.use('/api', createRoutes(db));

    return app;
}


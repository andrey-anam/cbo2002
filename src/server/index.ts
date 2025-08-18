import express from 'express';
import cors from 'cors';
import mainRouter from '../presentation/route';
import { setupSwagger } from '../infra/docs';
import { openApiRegistry } from '../infra/docs/openapi_config';

const app = express();

app
    .use(express.json())
    .use(cors());

app.get('/', (_req, res) => {
    res.status(302).redirect('/api/docs')
})

app.get('/ping', (_req, res) => {
    res.json({"message": "pong"}).end();
})

app.use('/api', mainRouter);

setupSwagger(app, openApiRegistry);

export default app;

import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import { generateSwaggerDocs } from './openapi_config';
import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { Request, Response } from "express";

export const setupSwagger = (app: Express, openApiRegistry: OpenAPIRegistry) => {
  const docs = generateSwaggerDocs(openApiRegistry)
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(docs));
  app.get('/api/docs.json', (_req: Request, res: Response) => {
    res.status(200).json(docs).end();
  });
};

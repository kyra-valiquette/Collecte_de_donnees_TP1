import { Logger, UnsupportedMediaTypeException, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { randomUUID } from 'node:crypto';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { ProblemDetailsFilter } from './common/filters/problem-details.filter.js';
import { configureSwagger } from './configure-swagger.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = (process.env.CORS_ORIGINS ?? 'http://localhost:3000,http://localhost:4200')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.use(helmet());
  app.use((req: any, res: any, next: (error?: unknown) => void) => {
    const requestId = (req.headers['x-request-id'] as string | undefined) ?? randomUUID();
    req.id = requestId;
    res.setHeader('X-Request-Id', requestId);

    const startedAt = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startedAt;
      Logger.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`, 'HTTP');
    });

    next();
  });

  app.use(
    json({
      limit: '1mb',
      strict: true,
    }),
  );

  app.use((req: any, res: any, next: (error?: unknown) => void) => {
    const method = req.method.toUpperCase();
    const contentType = req.headers['content-type'];
    const isJsonBodyRequest = ['POST', 'PATCH', 'PUT'].includes(method);

    if (!isJsonBodyRequest || !contentType || req.originalUrl.startsWith('/docs')) {
      return next();
    }

    if (!contentType.includes('application/json')) {
      return next(new UnsupportedMediaTypeException('Content-Type must be application/json for this request.'));
    }

    next();
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  );
  const port = Number(process.env.PORT);
  if (!process.env.PORT || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT configuration error');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI configuration error');
  }
  app.useGlobalFilters(new ProblemDetailsFilter());
  configureSwagger(app);

  await app.listen(port);
}

await bootstrap();
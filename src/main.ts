import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    }),
  );
  const port = Number(process.env.PORT);
  if (!process.env.PORT || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT configuration error');
  }
  if (!process.env.DATA_FILE_PATH) {
    throw new Error('DATA_FILE_PATH configuration error');
  }
  await app.listen(port);
}

await bootstrap();
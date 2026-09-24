import { existsSync } from 'node:fs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

// Optional .env file (Node's built-in loader); real environment variables take precedence.
if (existsSync('.env')) process.loadEnvFile();

const app = await NestFactory.create(AppModule);

app.setGlobalPrefix('api');
app.useGlobalPipes(
  new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
);

// In dev the Vite server proxies /api: CORS only matters when the front is served elsewhere.
const corsOrigin = process.env.CORS_ORIGIN;
if (corsOrigin) {
  app.enableCors({ origin: corsOrigin.split(',').map((origin) => origin.trim()) });
}

app.enableShutdownHooks();

const port = Number(process.env.PORT ?? 3000);
await app.listen(port);
Logger.log(`API ready on http://localhost:${port}/api`, 'Bootstrap');

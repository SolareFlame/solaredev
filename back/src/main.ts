import { existsSync } from 'node:fs';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module.js';

// Optional .env file (Node's built-in loader); real environment variables take precedence.
if (existsSync('.env')) process.loadEnvFile();

const app = await NestFactory.create<NestExpressApplication>(AppModule);

// The client IP (rate limiting) is read from X-Forwarded-For when the request comes through
// a proxy on a private address: the front's nginx and Caddy (Docker networks), Vite in dev.
app.set('trust proxy', 'loopback, uniquelocal');

app.setGlobalPrefix('api');

// In dev the Vite server proxies /api: CORS only matters when the front is served elsewhere.
const corsOrigin = process.env.CORS_ORIGIN;
if (corsOrigin) {
  app.enableCors({ origin: corsOrigin.split(',').map((origin) => origin.trim()) });
}

app.enableShutdownHooks();

const port = Number(process.env.PORT ?? 3000);
await app.listen(port);
Logger.log(`API ready on http://localhost:${port}/api`, 'Bootstrap');

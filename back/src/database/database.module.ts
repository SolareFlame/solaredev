import { fileURLToPath } from 'node:url';
import {
  Global,
  Inject,
  Logger,
  Module,
  type OnApplicationShutdown,
  type OnModuleInit,
} from '@nestjs/common';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import * as schema from './schema.js';

export type Database = NodePgDatabase<typeof schema>;

/** Injection token for the Drizzle client: `@Inject(DATABASE) db: Database`. */
export const DATABASE = Symbol('DATABASE');
const POOL = Symbol('POOL');

// Same relative path from src/database and dist/database.
const migrationsFolder = fileURLToPath(new URL('../../drizzle', import.meta.url));

@Global()
@Module({
  providers: [
    {
      provide: POOL,
      useFactory: () => {
        const connectionString = process.env.DATABASE_URL;
        if (!connectionString) throw new Error('DATABASE_URL is not set');
        return new pg.Pool({ connectionString });
      },
    },
    {
      provide: DATABASE,
      inject: [POOL],
      useFactory: (pool: pg.Pool): Database => drizzle({ client: pool, schema }),
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule implements OnModuleInit, OnApplicationShutdown {
  constructor(
    @Inject(POOL) private readonly pool: pg.Pool,
    @Inject(DATABASE) private readonly db: Database,
  ) {}

  /** Pending migrations are applied at boot: a single instance, no separate deploy step. */
  async onModuleInit(): Promise<void> {
    await migrate(this.db, { migrationsFolder });
    Logger.log('Database migrations applied', 'Database');
  }

  async onApplicationShutdown(): Promise<void> {
    await this.pool.end();
  }
}

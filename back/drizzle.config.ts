import { defineConfig } from 'drizzle-kit';

// `npm run db:generate` turns schema changes into SQL migrations, applied at boot.
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/database/schema.ts',
  out: './drizzle',
});

import { Knex } from 'knex';
import { createSetTimestampTrigger } from '../triggers/set-timestamp';

export async function up(knex: Knex): Promise<void> {
  const SQL = `
    CREATE TABLE IF NOT EXISTS projects (
      "id" SERIAL PRIMARY KEY,
      "name" VARCHAR (50) NOT NULL,
      "platform" VARCHAR (20) NOT NULL,
      "platform_id" VARCHAR(50) NOT NULL,
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deleted_at" TIMESTAMPTZ DEFAULT NULL,

      UNIQUE ("platform", "name")
    );
  `;

  await knex.raw(SQL);
  await knex.raw(createSetTimestampTrigger('projects'));
}

export async function down(knex: Knex): Promise<void> {
  const SQL = `
    DROP TABLE projects;
  `;
  await knex.raw(SQL);
}

import { Knex } from 'knex';
import { createSetTimestampTrigger } from '../triggers/set-timestamp';

export async function up(knex: Knex): Promise<void> {
  const SQL = `
    CREATE TABLE IF NOT EXISTS modules (
      "id" SERIAL PRIMARY KEY,
      "project_id" INT REFERENCES projects(id),
      "name" VARCHAR (50) NOT NULL,
      "path" VARCHAR (200) NOT NULL,
      "sha" VARCHAR(50) NOT NULL,
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deleted_at" TIMESTAMPTZ DEFAULT NULL
    );
  `;

  await knex.raw(SQL);
  await knex.raw(createSetTimestampTrigger('modules'));
}

export async function down(knex: Knex): Promise<void> {
  const SQL = `
    DROP TABLE modules;
  `;
  await knex.raw(SQL);
}

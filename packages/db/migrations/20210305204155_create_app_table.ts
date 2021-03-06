import { Knex } from 'knex';
import { createSetTimestampTrigger } from '../triggers/set-timestamp';

export async function up(knex: Knex): Promise<void> {
  const SQL = `
    CREATE TABLE IF NOT EXISTS apps (
      "id" UUID PRIMARY KEY,
      "name" VARCHAR (45),
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deleted_at" TIMESTAMPTZ DEFAULT NULL
    );
  `;

  await knex.raw(SQL);
  await knex.raw(createSetTimestampTrigger('apps'));
}

export async function down(knex: Knex): Promise<void> {
  const SQL = `
    DROP TABLE apps;
  `;
  await knex.raw(SQL);
}

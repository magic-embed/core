import { Knex } from 'knex';
import {
  triggerSetTimestampDefinition,
  createSetTimestampTrigger,
} from '../triggers/set-timestamp';

export async function up(knex: Knex): Promise<void> {
  const SQL = `
    CREATE TABLE IF NOT EXISTS users (
      "id" SERIAL PRIMARY KEY,
      "email" VARCHAR (100),
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deleted_at" TIMESTAMPTZ DEFAULT NULL,
      "confirmed_at" TIMESTAMPTZ DEFAULT NULL,
      UNIQUE("email")
    );
  `;
  await knex.raw(triggerSetTimestampDefinition);
  await knex.raw(SQL);
  await knex.raw(createSetTimestampTrigger('users'));
}

export async function down(knex: Knex): Promise<void> {
  const SQL = `
    DROP TABLE users;
  `;
  await knex.raw(SQL);
}

import { Knex } from 'knex';
import { createSetTimestampTrigger } from '../triggers/set-timestamp';

export async function up(knex: Knex): Promise<void> {
  const SQL = `
    CREATE TABLE IF NOT EXISTS user_apps (
      "id" SERIAL PRIMARY KEY,
      "user_id" INT REFERENCES users(id),
      "app_id" UUID REFERENCES apps(id),
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deleted_at" TIMESTAMPTZ DEFAULT NULL
    );
  `;

  await knex.raw(SQL);
  await knex.raw(createSetTimestampTrigger('user_apps'));
}

export async function down(knex: Knex): Promise<void> {
  const SQL = `
    DROP TABLE user_apps;
  `;
  await knex.raw(SQL);
}

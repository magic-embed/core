import { Knex } from 'knex';
import { createSetTimestampTrigger } from '../triggers/set-timestamp';

export async function up(knex: Knex): Promise<void> {
  const SQL = `
    CREATE TABLE IF NOT EXISTS app_projects (
      "id" SERIAL PRIMARY KEY,
      "app_id" UUID REFERENCES apps(id),
      "project_id" INT REFERENCES projects(id),
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deleted_at" TIMESTAMPTZ DEFAULT NULL
    );
  `;

  await knex.raw(SQL);
  await knex.raw(createSetTimestampTrigger('app_projects'));
}

export async function down(knex: Knex): Promise<void> {
  const SQL = `
    DROP TABLE app_projects;
  `;
  await knex.raw(SQL);
}

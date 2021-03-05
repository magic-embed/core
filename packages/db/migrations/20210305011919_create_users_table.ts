import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  const SQL = `
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TABLE IF NOT EXISTS "users" (
      "id" SERIAL PRIMARY KEY,
      "email" VARCHAR (100),
      "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      "deleted_at" TIMESTAMPTZ DEFAULT NULL,
      "confirmed_at" TIMESTAMPTZ DEFAULT NULL,
      UNIQUE("email")
    );

    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON "users"
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
  `;

  await knex.raw(SQL);
}

export async function down(knex: Knex): Promise<void> {
  const SQL = `
    DROP TABLE users;
  `;
  await knex.raw(SQL);
}

import knex, { Knex } from 'knex';
import knexfile from './knexfile';

export const createClient = (config?: Knex.Config): Knex =>
  knex({ debug: true, ...knexfile, ...config });

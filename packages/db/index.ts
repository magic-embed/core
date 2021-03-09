import knex, { Knex } from 'knex';
import config from './knexfile';

export const createClient = (options?: Knex.Config): Knex =>
  knex({ ...config, ...options, debug: true });

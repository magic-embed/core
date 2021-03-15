import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import Sensible from 'fastify-sensible';
import Cors from 'fastify-cors';
import Helmet from 'fastify-helmet';
import { createClient } from '@magic-embed/db';

const config: FastifyServerOptions = {
  logger: true,
  ignoreTrailingSlash: true,
};

const setup = (): FastifyInstance => {
  const instance: FastifyInstance = fastify(config);
  instance.register(Sensible, { errorHandler: false });
  instance.register(Cors)
  instance.register(Helmet)

  const dbClient = createClient();
  instance.decorate('db', dbClient);

  return instance;
};

export const server = setup();

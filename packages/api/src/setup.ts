import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import Sensible from 'fastify-sensible';
import Cors from 'fastify-cors';
import Helmet from 'fastify-helmet';
import Mercurius from 'mercurius';
import { createClient } from '@magic-embed/db';
import { passportSetup } from './passport';
import { schema } from './graphql/schema';

declare module 'fastify' {
  interface FastifyInstance {
    db: ReturnType<typeof createClient>;
  }
}


const config: FastifyServerOptions = {
  logger: true,
  ignoreTrailingSlash: true,
};

const setup = (): FastifyInstance => {
  const instance: FastifyInstance = fastify(config);
  instance.register(Sensible, { errorHandler: false });
  instance.register(Cors);
  instance.register(Helmet, {
    contentSecurityPolicy: {
      directives: {
        'default-src': "'self' https://unpkg.com 'unsafe-inline'",
      },
    },
  });
  instance.register(Mercurius, { schema, graphiql: true });

  const dbClient = createClient();
  instance.decorate('db', dbClient);

  instance.register(passportSetup);

  return instance;
};

export const server = setup();

import fastify, { FastifyInstance, FastifyServerOptions } from 'fastify';
import Sensible from 'fastify-sensible';
import Cors from 'fastify-cors';
import Helmet from 'fastify-helmet';
import Mercurius from 'mercurius';
import { createClient } from '@magic-embed/db';
import { passportSetup } from './passport';
import { schema } from './graphql/schema';
import { getRequestOrigin } from './utils/get-request-origin';
import passport from 'fastify-passport';

declare module 'fastify' {
  interface FastifyInstance {
    db: ReturnType<typeof createClient>;
  }
}

declare module 'mercurius' {
  interface MercuriusContext {
    origin: ReturnType<typeof getRequestOrigin>;
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

  const dbClient = createClient();
  instance.decorate('db', dbClient);

  instance.register(passportSetup);
  instance.register(
    Mercurius,
    {
      schema,
      graphiql: true,
      async context(request) {
        return {
          user: request.user, // always null
          origin: getRequestOrigin(request)
        };
      }
    }
  );

  return instance;
};

export const server = setup();

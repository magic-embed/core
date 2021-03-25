import { FastifyInstance, RouteHandlerMethod } from 'fastify';
import passport from 'fastify-passport';
import { login } from './login';
import { callback } from './callback';
import { magicLink } from 'src/passport/magic-link';

export async function auth(fastify: FastifyInstance) {
  fastify.register(
    async function (fastify) {
      fastify.get(
        '/',
        {
          schema: login.schema,
        },
        login
      );
      fastify.post(
        '/callback',
        { preValidation: passport.authenticate('magicLink', { authInfo: false }) },
        callback as RouteHandlerMethod
      );
    },
    { prefix: '/users' }
  );
}

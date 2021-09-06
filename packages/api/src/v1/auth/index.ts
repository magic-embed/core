import { FastifyInstance, RouteHandlerMethod } from 'fastify';
import passport from 'fastify-passport';
import { login } from './login';
import { callback } from './callback';
import STRATEGY from '../../passport/strategy';

export async function auth(fastify: FastifyInstance) {
  fastify.register(
    async function (fastify) {
      fastify.post(
        '/',
        {
          schema: login.schema,
        },
        login
      );
      fastify.get(
        '/callback',
        { preValidation: passport.authenticate(STRATEGY, { authInfo: false }) },
        callback as RouteHandlerMethod
      );
    },
    { prefix: '/auth' }
  );
}

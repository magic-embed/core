import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { magicLink } from '../../passport/magic-link';
import S from 'fluent-json-schema';

export async function login(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  const proxyReply = new Proxy(reply, {
    get(target, prop) {
      if (prop === 'json') {
        return (...args: any[]) => {
          reply.send(...args);
        };
      }
      // @ts-ignore
      return reply[prop].bind(target);
    },
  });
  return magicLink.send(request, proxyReply);
}

login.schema = {
  body: S.oneOf([
    S.string(),
    S.object().prop('success', S.boolean()).prop('code', S.number()).prop('error', S.string()),
  ]),
};

import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { magicLink } from '../../passport/magic-link';
import S from 'fluent-json-schema';


export async function login(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
): Promise<any> {
  this.decorateReply('json', function (data: Record<string, unknown>) {
    reply.send(data);
  });

  return magicLink.send(request, reply);
}

login.schema = {
  body: S.oneOf([
    S.string(),
    S.object()
      .prop('success', S.boolean())
      .prop('code', S.number())
      .prop('error', S.string())
  ])
}


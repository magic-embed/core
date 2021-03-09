import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import { createClient } from '@magic-embed/db';

const dbClient = createClient();
const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {
            type: 'string',
          },
        },
      },
    },
  },
};

server.get('/', opts, async (request, reply) => {
  try {
    const users = await dbClient().select('*').from('migrations');
    return reply
      .code(200)
      .serializer(JSON.stringify)
      .send({ users });
  } catch (e) {
    console.error(e);
  }
});

const start = async () => {
  try {
    await server.listen(3000);

    const address = server.server.address();
    const port = typeof address === 'string' ? address : address?.port;
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

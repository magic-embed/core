import { FastifyInstance } from 'fastify';

export async function apps(fastify: FastifyInstance) {
  fastify.get('/apps',async (req, res) => {
    return 'Apps';
  });
}

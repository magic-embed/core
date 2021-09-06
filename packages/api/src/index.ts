import { server } from './setup';
import { v1Routes } from './v1';

server.register(v1Routes, { prefix: '/api' });

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err: unknown) {
    server.log.error(err as string);
    process.exit(1);
  }
};
start();

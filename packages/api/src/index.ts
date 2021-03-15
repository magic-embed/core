import { server } from './setup';
import { v1Routes } from './v1';

server.register(v1Routes);

const start = async () => {
  try {
    await server.listen(3000);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

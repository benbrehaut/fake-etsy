import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';

import { ping } from './routes/ping';

const server = async () => {
  const app = new Koa();
  const router = new Router();
  const PORT = process.env.PORT || 8000;

  const pingRoutes = await ping();

  app.use(bodyParser());

  app.use(
    cors({
      origin: '*',
    })
  );

  app.use(logger());
  app.use(router.routes()).use(router.allowedMethods());

  app.use(pingRoutes.routes());

  app
    .listen(PORT, async () => {
      // eslint-disable-next-line no-console
      console.log(`Server started on ${PORT}`);
    })
    .on('error', async (error: Error) => {
      // eslint-disable-next-line no-console
      console.log(`There was an error: ${error}`);
    });
};

server().catch((error) => console.log(`Issue starting server: ${error}`));

export { server };

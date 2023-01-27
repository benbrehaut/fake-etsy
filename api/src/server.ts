import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';

import { LogMessage, MessageType } from './logger';
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
      LogMessage({ type: MessageType.Log, message: `Server started on ${PORT}` });
    })
    .on('error', async (error: Error) => {
      LogMessage({ type: MessageType.Error, message: `There was an error: ${error}` });
    });
};

server().catch((error) => LogMessage({ type: MessageType.Error, message: `Issues starting server: ${error}` }));

export { server };

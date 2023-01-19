import Router from '@koa/router';

const ping = async (router = new Router()) => {
  router.get('/ping', async (ctx) => {
    ctx.body = 'pong';
  });

  return router;
};

export { ping };

import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router';

const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 8000

app.use(bodyParser());

app.use(cors({
  origin: '*'
}));

app.use(logger());
app
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/ping', ctx => {
  ctx.body = 'pong';
});

const server = app
  .listen(PORT, async () => {
    console.log(`Server started on ${PORT}`);
  })
  .on("error", async (error: Error) => {
    console.log(`There was an error: ${error}`);
  });

export { server }
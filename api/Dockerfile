# # =======
# # BASE
# # =======
FROM node:16-alpine as base

# # ========
# # BUILD
# # ========
# FROM base as build
# WORKDIR /app

# COPY package.json ./
# COPY tsconfig.json ./
# RUN yarn install --production=true

# COPY . .

# # ========
# # FINAL
# # ========
# FROM base
# WORKDIR /app

# ENV NODE_ENV=production
# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules

# # CMD ["yarn", "start"]

FROM node:16-alpine as local

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY . .

FROM local AS dev

WORKDIR /app

ENV NODE_ENV=development

RUN yarn run build

EXPOSE 8000

CMD ["yarn", "start"]

FROM dev AS intermediate

WORKDIR /app

ENV NODE_ENV=production

RUN yarn build
RUN yarn install --production
RUN yarn cache clean

FROM node:16-alpine as prod

WORKDIR /app

ENV NODE_ENV=production

COPY --from=intermediate /app/dist /app/dist
COPY --from=intermediate /app/node_modules /app/node_modules
COPY --from=intermediate /app/package.json ./

EXPOSE 8000

CMD ["yarn", "start"]

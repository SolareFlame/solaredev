# syntax=docker/dockerfile:1

# API image (NestJS). Built from the repo root: docker build -f back/Dockerfile .
ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS manifests
WORKDIR /app
# npm workspaces: `npm ci` checks the lockfile against every workspace manifest.
COPY package.json package-lock.json ./
COPY back/package.json back/
COPY front/package.json front/

FROM manifests AS build
RUN --mount=type=cache,target=/root/.npm npm ci --workspace back
COPY back/ back/
RUN npm run build --workspace back

FROM manifests AS prod-deps
RUN --mount=type=cache,target=/root/.npm npm ci --workspace back --omit=dev

FROM node:${NODE_VERSION}-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=prod-deps /app ./
COPY --from=build /app/back/dist back/dist
# SQL migrations, applied at boot by DatabaseModule.
COPY back/drizzle back/drizzle
WORKDIR /app/back
USER node
EXPOSE 3000
CMD ["node", "--enable-source-maps", "dist/main.js"]

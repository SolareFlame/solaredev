# syntax=docker/dockerfile:1

# Static site image (Vue + Vite, served by nginx). Built from the repo root: docker build -f front/Dockerfile .
ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-alpine AS build
WORKDIR /app
# npm workspaces: `npm ci` checks the lockfile against every workspace manifest.
COPY package.json package-lock.json ./
COPY back/package.json back/
COPY front/package.json front/
RUN --mount=type=cache,target=/root/.npm npm ci --workspace front
COPY front/ front/
RUN npm run build --workspace front

# Runs as the unprivileged `nginx` user, listening on 8080.
FROM nginxinc/nginx-unprivileged:1.30-alpine
COPY front/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/front/dist /usr/share/nginx/html
EXPOSE 8080

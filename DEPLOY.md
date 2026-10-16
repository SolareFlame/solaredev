# Deploy

The whole stack is [docker-compose.yml](docker-compose.yml), configured by `.env` (template: [.env.example](.env.example)), the same locally and on the server:

| Service    | What                                                    | Networks                            |
| ---------- | ------------------------------------------------------- | ----------------------------------- |
| `front`    | nginx: the Vite build, and `/api` relayed to the back    | `default`, Caddy's network (alias `solaredev-front`) |
| `back`     | NestJS API on `3000`                                    | `default`, `db`                     |
| `postgres` | `postgres:17-alpine`, volume `postgres-data`            | `db`                                |

Only the front (`FRONT_PORT`, 8080) and Postgres (`POSTGRES_PORT`, 5432) are published, on `127.0.0.1`: never reachable from outside the machine. Caddy reaches the front over an external network, `PROXY_NETWORK` in `.env` (`proxy` locally, `figutab_default` on the server).

## Locally

Once: `docker network create proxy`, and `cp .env.example .env` with `GITHUB_TOKEN` filled in. Then:

```bash
docker compose up -d --build --wait
```

The site is on http://localhost:8080. For `npm run dev`, start only the database: `docker compose up -d postgres`.

## On the server

```bash
git clone https://github.com/solareflame/solaredev.git
cd solaredev
cp .env.example .env
chmod 600 .env
```

In `.env`: a strong `POSTGRES_PASSWORD` (`openssl rand -hex 32`), `GITHUB_TOKEN`, `PROXY_NETWORK=figutab_default`, and a free `POSTGRES_PORT` / `FRONT_PORT` if 5432 or 8080 are taken on the server. Then:

```bash
docker compose up -d --build --wait
```

Update:

```bash
git pull
docker compose up -d --build --wait
docker image prune -f
```

Status and logs:

```bash
docker compose ps
docker compose logs -f --tail 100 back
```

## Migrations

Drizzle migrations (`back/drizzle/`) are applied by the back itself at startup, before the API listens: `docker compose up` is the migration step. Check it ran:

```bash
docker compose logs back | grep "migrations applied"
```

A failing migration stops the back from starting instead of serving on a half-migrated schema. New migrations come from `npm run db:generate --workspace back`, committed with the schema change.

## Caddy

In the server's Caddyfile (`~/figutab/deploy`). `/api` needs no route, the front's nginx relays it. `solare.dev` goes through Cloudflare's proxy: `CF-Connecting-IP` carries the visitor's IP, used by the API's per-IP rate limit.

```caddy
solare.dev {
	reverse_proxy solaredev-front:8080 {
		header_up X-Forwarded-For {http.request.header.CF-Connecting-IP}
	}
}
```

Reload Caddy once the stack is up (from `~/figutab/deploy`):

```bash
docker compose -f docker-compose.prod.yml exec caddy caddy validate --config /etc/caddy/Caddyfile
docker compose -f docker-compose.prod.yml exec caddy caddy reload --config /etc/caddy/Caddyfile
```

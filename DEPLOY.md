# Deploy

The whole stack is [docker-compose.yml](docker-compose.yml), configured by `.env` (template: [.env.example](.env.example)), the same locally and on the server:

| Service    | What                                                    | Networks                            |
| ---------- | ------------------------------------------------------- | ----------------------------------- |
| `front`    | nginx: the Vite build, and `/api` relayed to the back    | `default`, `proxy` (alias `solaredev-front`) |
| `back`     | NestJS API on `3000`                                    | `default`, `db`                     |
| `postgres` | `postgres:17-alpine`, volume `postgres-data`            | `db`                                |

Only the front (`FRONT_PORT`, 8080) and Postgres (`POSTGRES_PORT`, 5432) are published, on `127.0.0.1`: never reachable from outside the machine. In prod, Caddy reaches the front over the external `proxy` network.

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

In `.env`: a strong `POSTGRES_PASSWORD` (`openssl rand -hex 32`), `GITHUB_TOKEN`, and a free `POSTGRES_PORT` / `FRONT_PORT` if 5432 or 8080 are taken on the server. Then:

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

`solare.dev` goes through Cloudflare's proxy, so Caddy sees Cloudflare's IPs. To pass the visitor's IP on to the API (its rate limit is per IP), trust Cloudflare's ranges ([cloudflare.com/ips](https://www.cloudflare.com/ips/)) in the global options, merged into any existing ones:

```caddy
{
	servers {
		trusted_proxies static 173.245.48.0/20 103.21.244.0/22 103.22.200.0/22 103.31.4.0/22 141.101.64.0/18 108.162.192.0/18 190.93.240.0/20 188.114.96.0/20 197.234.240.0/22 198.41.128.0/17 162.158.0.0/15 104.16.0.0/13 104.24.0.0/14 172.64.0.0/13 131.0.72.0/22 2400:cb00::/32 2606:4700::/32 2803:f800::/32 2405:b500::/32 2405:8100::/32 2a06:98c0::/29 2c0f:f248::/32
		client_ip_headers CF-Connecting-IP
	}
}

solare.dev {
	encode zstd gzip
	reverse_proxy solaredev-front:8080 {
		header_up X-Forwarded-For {client_ip}
	}
}
```

Without the global options the site works the same, but every visitor behind the same Cloudflare server shares one rate limit.

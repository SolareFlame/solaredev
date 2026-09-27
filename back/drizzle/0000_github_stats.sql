CREATE TABLE "github_stats" (
	"id" integer PRIMARY KEY NOT NULL,
	"total_commits" integer NOT NULL,
	"commits_by_year" jsonb NOT NULL,
	"fetched_at" timestamp with time zone NOT NULL
);

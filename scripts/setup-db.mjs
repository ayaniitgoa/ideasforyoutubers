import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import pg from "pg";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv(filePath) {
  try {
    const text = readFileSync(filePath, "utf8");
    for (const line of text.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) {
        continue;
      }
      const index = trimmed.indexOf("=");
      if (index === -1) {
        continue;
      }
      const key = trimmed.slice(0, index).trim();
      const value = trimmed.slice(index + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  } catch {
    // File may not exist.
  }
}

loadEnv(path.join(root, ".env.local"));

function slugify(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function handleFromUrl(url) {
  const match = url.match(/@([^/?#]+)/);
  return match ? slugify(decodeURIComponent(match[1])) : "";
}

function withSlugs(records) {
  const used = new Map();
  return records.map((record) => {
    const base = slugify(record.channel) || handleFromUrl(record.url) || record.id;
    const seen = used.get(base) ?? 0;
    used.set(base, seen + 1);
    return { ...record, slug: seen === 0 ? base : `${base}-${seen + 1}` };
  });
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is missing from .env.local");
}

const sql = readFileSync(path.join(root, "supabase/migrations/001_init.sql"), "utf8");
const catalog = JSON.parse(readFileSync(path.join(root, "src/data/youtubers.json"), "utf8"));
const channels = withSlugs(catalog);

const client = new pg.Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

await client.connect();
await client.query(sql);

for (const channel of channels) {
  await client.query(
    `insert into public.youtubers (
      id, slug, category, url, image, channel,
      subscribers_label, views_label, videos_label,
      subscribers, views, videos
    ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
    on conflict (id) do update set
      slug = excluded.slug,
      category = excluded.category,
      url = excluded.url,
      image = excluded.image,
      channel = excluded.channel,
      subscribers_label = excluded.subscribers_label,
      views_label = excluded.views_label,
      videos_label = excluded.videos_label,
      subscribers = excluded.subscribers,
      views = excluded.views,
      videos = excluded.videos`,
    [
      channel.id,
      channel.slug,
      channel.category,
      channel.url,
      channel.image,
      channel.channel,
      channel.subscribersLabel,
      channel.viewsLabel,
      channel.videosLabel,
      channel.subscribers,
      channel.views,
      channel.videos,
    ],
  );
}

await client.query("notify pgrst, 'reload schema'");
const count = await client.query("select count(*)::int as n from public.youtubers");
await client.end();
console.log(`Seeded ${count.rows[0].n} youtubers`);

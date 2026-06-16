import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ARTICLES_DIR = "articles";

export function listArticles(projectRoot) {
  const dir = join(projectRoot, ARTICLES_DIR);
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function readFile(projectRoot, articleDir, fileName) {
  const p = join(projectRoot, ARTICLES_DIR, articleDir, fileName);
  if (!existsSync(p)) return null;
  return readFileSync(p, "utf8");
}

export function findLatestDraft(projectRoot) {
  const articles = listArticles(projectRoot);
  if (articles.length === 0) return null;
  articles.sort().reverse();
  const latest = articles[0];
  for (const f of ["final.md", "draft.md"]) {
    const content = readFile(projectRoot, latest, f);
    if (content) return { dir: latest, file: f, content };
  }
  return null;
}

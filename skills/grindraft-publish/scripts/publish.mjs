import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function registerArticle(projectRoot, articleDir, url) {
  const statePath = join(projectRoot, ".grindraft-state.json");
  if (!existsSync(statePath)) return { error: "No state file" };
  const state = JSON.parse(readFileSync(statePath, "utf8"));
  if (!state.articles) state.articles = [];
  const existing = state.articles.find((a) => a.dir === articleDir);
  if (existing) {
    existing.url = url;
    existing.publishedAt = new Date().toISOString();
  } else {
    state.articles.push({ dir: articleDir, url, publishedAt: new Date().toISOString() });
  }
  writeFileSync(statePath, JSON.stringify(state, null, 2));
  return { ok: true };
}

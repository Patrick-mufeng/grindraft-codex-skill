import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export function buildDashboard(projectRoot) {
  const statePath = join(projectRoot, ".grindraft-state.json");
  const candidatesPath = join(projectRoot, "candidates.md");
  const articlesDir = join(projectRoot, "articles");

  const state = existsSync(statePath) ? JSON.parse(readFileSync(statePath, "utf8")) : null;
  const candidates = existsSync(candidatesPath) ? readFileSync(candidatesPath, "utf8").split("\n").filter((l) => l.trim()).length : 0;
  const articles = existsSync(articlesDir) ? readdirSync(articlesDir).length : 0;

  return {
    mode: state?.mode || "cold-start",
    rubricVersion: state?.rubricVersion || "v0",
    articleCount: articles,
    candidateCount: candidates,
    publishedCount: state?.articles?.filter((a) => a.url)?.length || 0,
    articles: state?.articles || [],
  };
}

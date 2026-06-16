import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function detectPhase(projectRoot) {
  const hasState = existsSync(join(projectRoot, ".grindraft-state.json"));
  const hasArticles = existsSync(join(projectRoot, "articles"));
  const hasRubric = existsSync(join(projectRoot, "rubric_notes.md"));
  const hasCandidates = existsSync(join(projectRoot, "candidates.md"));
  const articles = hasArticles ? readdirSafe(join(projectRoot, "articles")) : [];
  const retroCount = articles.filter((a) => existsSync(join(projectRoot, "articles", a, "prediction.md"))).length;

  if (!hasState) return "init";
  if (!hasCandidates) return "cold-start";
  if (retroCount < 5) return "calibrating";
  return "steady";
}

function readdirSafe(p) {
  try { return readdirSync(p); } catch { return []; }
}

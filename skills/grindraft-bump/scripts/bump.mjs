import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

export function reScoreAll(projectRoot, newWeights) {
  const articlesDir = join(projectRoot, "articles");
  if (!existsSync(articlesDir)) return [];
  const dirs = readdirSync(articlesDir, { withFileTypes: true }).filter((d) => d.isDirectory());
  const results = [];
  for (const d of dirs) {
    const predPath = join(articlesDir, d.name, "prediction.md");
    if (!existsSync(predPath)) continue;
    const pred = readFileSync(predPath, "utf8");
    const scores = {};
    const matches = pred.matchAll(/\*\*([A-Z]{2})\*\*:\s*(\d+)\/5/g);
    for (const m of matches) scores[m[1]] = parseInt(m[2]);
    if (Object.keys(scores).length === 0) continue;
    const composite = computeComposite(scores, newWeights);
    results.push({ dir: d.name, scores, composite });
  }
  return results;
}

function computeComposite(scores, weights) {
  let sum = 0, tw = 0;
  for (const [dim, score] of Object.entries(scores)) {
    const w = weights[dim] ?? 1;
    sum += score * w;
    tw += w;
  }
  return tw > 0 ? +(sum / tw).toFixed(2) : 0;
}

export function checkConsistency(oldRanked, newRanked, threshold = 0.8) {
  if (oldRanked.length === 0 || newRanked.length === 0) return { pass: false, reason: "No data" };
  const minLen = Math.min(oldRanked.length, newRanked.length);
  let matches = 0;
  for (let i = 0; i < minLen; i++) {
    if (oldRanked[i].dir === newRanked[i].dir) matches++;
  }
  const ratio = matches / minLen;
  return { pass: ratio >= threshold, ratio: +ratio.toFixed(2), matches, total: minLen };
}

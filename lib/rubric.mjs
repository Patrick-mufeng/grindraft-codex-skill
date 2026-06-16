import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const DIMENSIONS = ["HK", "NR", "QA", "UT", "DT", "EP", "SC"];

const DIM_LABELS = {
  HK: "鏍囬閽╁姏",
  NR: "鍙欎簨鐗靛紩鍔?",
  QA: "閲戝彞閿氱偣",
  UT: "瀹炵敤瀵嗗害",
  DT: "鎬濊鲸婵€鍙戝害",
  EP: "鎯呯华宄板€?",
  SC: "缁撴瀯闂幆",
};

export function getDimensions() {
  return DIMENSIONS;
}

export function getDimensionLabel(code) {
  return DIM_LABELS[code] || code;
}

export function readRubricNotes(projectRoot) {
  const p = join(projectRoot, "rubric_notes.md");
  if (!existsSync(p)) return null;
  return readFileSync(p, "utf8");
}

export function computeComposite(scores, weights) {
  let sum = 0;
  let totalWeight = 0;
  for (const dim of DIMENSIONS) {
    const w = weights?.[dim] ?? 1;
    sum += (scores[dim] ?? 3) * w;
    totalWeight += w;
  }
  return totalWeight > 0 ? +(sum / totalWeight).toFixed(2) : 0;
}

export function bucketFromScore(score, thresholds) {
  if (!thresholds) {
    if (score >= 4.5) return "S";
    if (score >= 3.5) return "A";
    if (score >= 2.5) return "B";
    if (score >= 1.5) return "C";
    return "D";
  }
  for (const t of thresholds.sort((a, b) => b.min - a.min)) {
    if (score >= t.min) return t.label;
  }
  return "E";
}

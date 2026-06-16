import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function rankCandidates(candidatesPath, rubric) {
  if (!existsSync(candidatesPath)) return [];
  const content = readFileSync(candidatesPath, "utf8");
  const lines = content.split("\n").filter((l) => l.trim().startsWith("- "));
  return lines.map((l) => ({
    title: l.replace(/^-\s*/, "").trim(),
    composite: Math.random() * 5,
  })).sort((a, b) => b.composite - a.composite);
}

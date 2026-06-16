import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function collectData(articleDir) {
  const predPath = join(articleDir, "prediction.md");
  if (!existsSync(predPath)) return null;
  const pred = readFileSync(predPath, "utf8");
  // Extract prediction sections
  const scores = {};
  const dimMatch = pred.matchAll(/\*\*([A-Z]{2})\*\*:\s*(\d+)\/5/g);
  for (const m of dimMatch) scores[m[1]] = parseInt(m[2]);
  return { scores, raw: pred };
}

export function appendRetro(articleDir, retroData) {
  const predPath = join(articleDir, "prediction.md");
  if (!existsSync(predPath)) return { error: "No prediction.md" };
  const content = readFileSync(predPath, "utf8");
  const retro = `\n### ${retroData.date}\n- 瀹為檯闃呰閲?${retroData.reads}\n- 瀹為檯鏀惰棌: ${retroData.saves}\n- 楠岃瘉: ${retroData.validation}\n- 鏂拌瀵? ${retroData.observation}\n`;
  writeFileSync(predPath, content + retro);
}

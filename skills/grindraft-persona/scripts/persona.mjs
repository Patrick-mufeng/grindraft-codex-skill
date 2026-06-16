import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function extractComments(predictionContent) {
  const retroMatch = predictionContent.match(/## 澶嶇洏[\s\S]*$/);
  if (!retroMatch) return [];
  const comments = [];
  const commentLines = retroMatch[0].match(/- 鐣欒█: .+/g);
  if (commentLines) comments.push(...commentLines.map((l) => l.replace("- 鐣欒█: ", "").trim()));
  return comments;
}

export function mergePersona(audiencePath, newTraits) {
  let existing = {};
  if (existsSync(audiencePath)) {
    existing = JSON.parse(readFileSync(audiencePath, "utf8"));
  }
  const merged = { ...existing };
  for (const [key, value] of Object.entries(newTraits)) {
    if (merged[key]) {
      merged[key].count = (merged[key].count || 1) + 1;
    } else {
      merged[key] = { ...value, count: 1 };
    }
  }
  writeFileSync(audiencePath, JSON.stringify(merged, null, 2));
}

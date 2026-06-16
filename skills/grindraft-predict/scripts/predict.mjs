import { writeFileSync } from "node:fs";
import { join } from "node:path";

const DIMS = ["HK", "NR", "QA", "UT", "DT", "EP", "SC"];

export function createPredictionLog(articleDir, scores, bucket, bets, counterfactuals, assumptions) {
  const log = [
    "---",
    "type: prediction",
    "immutable: true",
    `created: ${new Date().toISOString()}`,
    "---",
    "",
    "## 鐩查娴嬭褰?",
    "",
    "### 7 缁村緱鍒?",
  ];
  for (const dim of DIMS) {
    log.push(`- **${dim}**: ${scores[dim] ?? "?"}/5`);
  }
  log.push("", `**Composite**: ${assumptions?.composite ?? "?"}`);
  log.push("", `**Bucket**: ${bucket ?? "?"}`);
  if (bets) log.push("", `**Direction bet**: ${bets}`);
  log.push("", "### 鍙嶄簨瀹炲満鏅?", "...");
  log.push("", "### 鏍″噯鍋囪", "...");
  log.push("", "---", "## 澶嶇洏锛堝彧杩藉姞锛屼笉鏀瑰彉涓婇潰锛?");
  log.push("", `*${new Date().toISOString().slice(0, 10)}*`);

  const content = log.join("\n");
  writeFileSync(join(articleDir, "prediction.md"), content);
  return articleDir;
}

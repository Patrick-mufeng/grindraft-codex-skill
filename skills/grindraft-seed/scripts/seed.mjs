import { writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

export function appendCandidate(projectRoot, title, angle) {
  const p = join(projectRoot, "candidates.md");
  const line = `- ${title}${angle ? `（${angle}）` : ""}`;
  const content = existsSync(p) ? readFileSync(p, "utf8") + "\n" + line : line;
  writeFileSync(p, content + "\n");
}

export function writeQuickDraft(projectRoot, title, content) {
  const dir = join(projectRoot, "articles", `${title}_${new Date().toISOString().slice(0, 10)}`);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "draft.md"), content);
}

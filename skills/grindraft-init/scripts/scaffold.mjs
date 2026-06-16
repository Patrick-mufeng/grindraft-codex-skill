import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

export function scaffold(projectRoot, mode) {
  const dirs = ["articles", "cover", "illustrations"];
  for (const d of dirs) {
    mkdirSync(join(projectRoot, d), { recursive: true });
  }
  const state = {
    mode: mode || "cold-start",
    rubricVersion: "v0",
    createdAt: new Date().toISOString(),
    articles: [],
  };
  writeFileSync(join(projectRoot, ".grindraft-state.json"), JSON.stringify(state, null, 2));
}

export function createConfigFiles(projectRoot) {
  const files = {
    "rubric_notes.md": "# Rubric Notes\n\n## Weights\nAll dimensions equal-weighted (v0).\n",
    "style_guide.md": "# Personal Style Guide\n\n[TODO: 填写你的写作偏好]\n",
    "WORKFLOW.md": "# Workflow\n\nSee CLAUDE.md for full workflow.\n",
    "STATUS.md": "# Status\n\nInitialized.\n",
  };
  for (const [name, content] of Object.entries(files)) {
    const p = join(projectRoot, name);
    if (!existsSync(p)) writeFileSync(p, content);
  }
}

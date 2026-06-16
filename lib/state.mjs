import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const STATE_FILE = ".grindraft-state.json";

export function readState(projectRoot) {
  const p = join(projectRoot, STATE_FILE);
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8"));
}

export function writeState(projectRoot, data) {
  const p = join(projectRoot, STATE_FILE);
  writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

export function getMode(state) {
  if (!state) return "cold-start";
  return state.mode || "cold-start";
}

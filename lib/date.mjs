import { execSync } from "node:child_process";

export function today() {
  try {
    const out = execSync("powershell -Command Get-Date -Format yyyy-MM-dd", { encoding: "utf8" }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) return out;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

export function retroWindow(dateStr, nDays = 3) {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + nDays);
  return d.toISOString().slice(0, 10);
}

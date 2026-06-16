export async function fetchTrends() {
  const url = "https://aihot.vercel.app/api/trending";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function deduplicate(items, existing) {
  const existingSet = new Set(existing.map((e) => e.title?.trim()));
  return items.filter((item) => !existingSet.has(item.title?.trim()));
}

export function appendToCandidates(filePath, newItems) {
  const { readFileSync, writeFileSync, existsSync } = await import("node:fs");
  let existing = [];
  if (existsSync(filePath)) {
    const raw = readFileSync(filePath, "utf8");
    existing = raw.split("\n").filter((l) => l.trim()).map((l) => ({ title: l.trim() }));
  }
  const unique = deduplicate(newItems, existing);
  if (unique.length === 0) return { added: 0 };
  const lines = unique.map((i) => `- ${i.title}`);
  writeFileSync(filePath, (existing.length ? raw + "\n" : "") + lines.join("\n") + "\n");
  return { added: unique.length };
}

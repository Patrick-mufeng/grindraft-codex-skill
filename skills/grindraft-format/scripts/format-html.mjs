import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";

const BASE_THEMES = [
  { name: "鑴夊啣", primary: "#8B4513", secondary: "#D2691E", bg: "#FFF8F0" },
  { name: "鍒?,"primary: "#2E8B57", secondary: "#3CB371", bg: "#F5FFF5" },
  { name: "绾告懇", primary: "#4682B4", secondary: "#5F9EA0", bg: "#F0F8FF" },
  { name: "鏋?,"primary: "#6B5B95", secondary: "#9B8EC4", bg: "#F8F4FF" },
  { name: "缂?,"primary: "#B22222", secondary: "#DC143C", bg: "#FFF5F5" },
  { name: "澹?,"primary: "#4A4A4A", secondary: "#6B6B6B", bg: "#F8F8F8" },
  { name: "鑺?,"primary: "#C71585", secondary: "#DB7093", bg: "#FFF0F5" },
  { name: "绔?,"primary: "#006400", secondary: "#228B22", bg: "#F0FFF0" },
];

let themeIndex = { current: -1 };

export function pickTheme(usedNames) {
  const available = BASE_THEMES.filter((t) => !usedNames.includes(t.name));
  if (available.length === 0) return BASE_THEMES[themeIndex.current % BASE_THEMES.length];
  themeIndex.current = (themeIndex.current + 1) % available.length;
  return available[themeIndex.current];
}

export function mdToWechatHtml(md, theme) {
  const lines = md.split("\n");
  let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width">`;
  html += `<style>body{font-size:16px;line-height:1.8;color:#333;max-width:677px;margin:0 auto;padding:16px;background:${theme?.bg || "#FFF"}}</style></head><body>`;
  for (const line of lines) {
    if (line.startsWith("# ")) html += `<h1 style="color:${theme?.primary || "#000"}">${line.slice(2)}</h1>`;
    else if (line.startsWith("## ")) html += `<h2 style="color:${theme?.primary || "#000"}">${line.slice(3)}</h2>`;
    else if (line.trim()) html += `<p>${line}</p>`;
  }
  html += "</body></html>";
  return html;
}

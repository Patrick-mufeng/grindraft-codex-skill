import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export function generateShotList(articleText) {
  const paragraphs = articleText.split("\n\n").filter((p) => p.trim().length > 50);
  const shots = [];
  for (let i = 0; i < Math.min(paragraphs.length, 5); i++) {
    const p = paragraphs[i].slice(0, 60);
    shots.push({
      id: i + 1,
      scene: p + "...",
      style: "灏忛粦鎬誕鎵嬬粯椋庢牸",
      aspect: "16:9",
    });
  }
  return shots;
}

export function generatePrompt(shot, styleRefPath) {
  let stylePrompt = "灏忛粦鎬誕鎵嬬粯椋庢牸锛岄粦鐧戒负涓伙紝绮楃姺绾挎潯锛岃〃鎯呭挰寮狅紝鐚庡鍠锋ā";
  try {
    if (styleRefPath && existsSync(styleRefPath)) {
      stylePrompt = readFileSync(styleRefPath, "utf8").trim();
    }
  } catch {}
  return `${shot.scene} 銆?${stylePrompt}`;
}

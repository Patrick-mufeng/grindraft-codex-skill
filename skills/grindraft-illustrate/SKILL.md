---
name: grindraft-illustrate
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
description: |
  正文配图生成。读文章自动分析出配图策略（shot list），用小黑怪诞手绘风格逐张生成 16:9 横版插图。触发词："配图"/"生成配图"/"文章插图"/"illustrate"/"做插图"。
---

# grindraft-illustrate — 正文配图生成

## 流程

```
用户说"做配图"
  → 读文章
  → 分析配图策略 → 生成 shot list
  → 每张按小黑怪诞手绘风格生成
  → 写入 articles/{title}/illustrations/
```

## 风格参考

- 见 `references/style-dna.md` — 小黑 IP 视觉特征
- 见 `references/composition-patterns.md` — 构图模式
- 见 `references/prompt-template.md` — 提示词模板
- 见 `references/xiaohei-ip.md` — 角色设定
- 见 `references/qa-checklist.md` — 质量检查

## 脚本

```js
const { generateShotList, generatePrompt } = await import("./scripts/generate-illustration.mjs");
const shots = generateShotList(articleText);
for (const shot of shots) {
  const prompt = generatePrompt(shot, "./references/style-dna.md");
  // 调用绘图 API
}
```

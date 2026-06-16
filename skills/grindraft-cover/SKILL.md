---
name: grindraft-cover
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
description: |
  公众号封面设计。读文章自动分析情绪+领域，从40套模板推荐3个，生成预览HTML和PNG。支持改稿循环（换文案/调色/换模板）。触发词："设计封面"/"帮我做封面"/"生成封面"/"公众号封面"/"封面"。
---

# grindraft-cover — 封面设计

## 流程

```
用户说"设计封面"
  → 读文章（优先 scripts/，fallback drafts/）
  → 情绪×领域三维分析
  → 从 cover-templates/ 推荐 3 个模板（带色板+推荐理由）
  → 提取封面文案（标题≤5字+描述+标签）
  → 生成预览 HTML（1.35:1 大图 + 1:1 小图）
  → 用户确认 → 可导出 PNG（需 Node.js + puppeteer）
```

## 设计原则

见 `cover-templates/design-principles.md`，`cover-templates/index.md`。

## 脚本

```js
const { analyzeArticle, matchTemplate } = await import("./scripts/cover.mjs");
const result = analyzeArticle(articleText);
const templates = matchTemplate(result, allTemplates, 3);
```

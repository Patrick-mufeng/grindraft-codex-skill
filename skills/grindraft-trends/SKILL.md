---
name: grindraft-trends
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - WebFetch
description: |
  从 aihot 抓取 AI 圈精选资讯，去重+粗打标+写入选题池。默认源 aihot，可扩展。触发词："抓热点"/"fetch trends"/"今天有什么可写的"/"AI 圈有什么"/"最近 AI 动态"。
---

# grindraft-trends — 热点抓取

## 流程

```
用户说"抓热点"
  → node scripts/fetch-trends.mjs fetchTrends()
  → 展示给用户 → 用户选择感兴趣的热点
  → 写入 candidates.md
```

## 脚本

```js
const { fetchTrends, appendToCandidates } = await import("./scripts/fetch-trends.mjs");
const items = await fetchTrends();
const result = await appendToCandidates("./candidates.md", items);
console.log(`添加了 ${result.added} 条热点`);
```

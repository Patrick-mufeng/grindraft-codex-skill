---
name: grindraft-recommend
allowed-tools:
  - Bash
  - Read
  - Glob
description: |
  从选题池按当前 rubric 排序推荐 top N 选题，每条带 composite + 一句话理由 + 锚点对比。触发词："推荐选题"/"next topic"/"下一篇写什么"/"挑个选题"。
---

# grindraft-recommend — 选题推荐

## 流程

```
1. 读 candidates.md
2. 按 rubric 各维打分 → 计算 composite
3. 降序展示 top N
4. 每条带 rubric 各维得分 + rationale + 锚点对比
```

## 脚本

```js
const { rankCandidates } = await import("./scripts/rank.mjs");
const ranked = rankCandidates("./candidates.md", rubric);
for (const r of ranked) console.log(`${r.title} (composite: ${r.composite})`);
```

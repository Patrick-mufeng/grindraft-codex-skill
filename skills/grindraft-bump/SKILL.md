---
name: grindraft-bump
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
  - Glob
description: |
  Rubric 升级—调整维度权重/bucket 边界/新增维度。必须经全量重打+跨模型审核。触发词："升级 rubric"/"bump rubric"/"更新公式"/"调整权重"。
---

# grindraft-bump — Rubric 升级

**严格遵守 bump-validation-protocol.md。**

## 流程

```
1. 用户提出升级方案（改权重/边界/新维度）
2. 执行全量重打：node scripts/bump.mjs reScoreAll
3. 检查排序一致性 ≥ 80%
4. 跨模型审核验证
5. 通过 → 更新 rubric_notes.md + STATE
6. 不通过 → 调方案
```

## 脚本

```js
const { reScoreAll, checkConsistency } = await import("./scripts/bump.mjs");
const oldRanked = [...]; // existing order
const newResults = reScoreAll(projectRoot, { HK: 2, NR: 1, QA: 1.5 });
const result = checkConsistency(oldRanked, newResults);
console.log(`一致性: ${result.ratio} ${result.pass ? "✅" : "❌"}`);
```

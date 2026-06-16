---
name: grindraft-predict
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
description: |
  给终稿写一份 immutable 盲预测日志。AI 打7维分 + bucket 押注 + 概率分布 + 反事实场景 + 关键校准假设。Cold-start 期简化版（只做7维分+方向押注）。触发词："启动预测"/"predict"/"写预测日志"/"打分并预测"。
---

# grindraft-predict — 盲预测

**原则：写完即锁定，不可修改。** 不碰 prediction.md 已写的内容。

## 流程

```
Phase 1: AI 打 7 维分（读 rubric_notes.md）
Phase 2: spawn grindraft-score-blind（Channel B 隔离打分）
Phase 3: 综合 → bucket 押注 + 概率分布
Phase 4: 写 prediction.md → 不可修改
```

## Cold-start vs Calibration

| | Cold-start（≤5篇） | Calibration |
|--|-------------------|-------------|
| 打分 | 7 维 1-5 分 | 7 维 1-5 分 |
| 押注 | 方向（更好/差不多/不如） | bucket + 概率分布 |
| 反事实 | 不写 | 写 |
| 校准假设 | 不写 | 写 |

## 脚本

```js
const { createPredictionLog } = await import("./scripts/predict.mjs");
createPredictionLog(articleDir, scores, bucket, bets, counterfactuals, assumptions);
```

---
name: grindraft-score-blind
allowed-tools:
  - Read
  - Glob
description: |
  INTERNAL sub-agent for blind 7-dim rubric scoring. NOT a user-facing skill—do NOT invoke from main conversation. Spawned by grindraft-predict Phase 2. Reads only rubric_notes.md, never sees state/articles/prediction files/audience. Returns strict JSON.
---

# grindraft-score-blind — Channel B 隔离打分

> **这不是用户可调用的 skill。** 仅由 grindraft-predict 通过 sub-agent spawn。子 agent 的 context 与主对话隔离。

## 输入

spawn 时传两个路径：
1. rubric_notes.md 路径
2. 待打分文章路径

## 输出

严格 JSON 格式：

```json
{
  "scores": { "HK": 4, "NR": 3, "QA": 5, "UT": 2, "DT": 3, "EP": 4, "SC": 3 },
  "rationale": { "HK": "标题数字+悬念，钩子强", "NR": "叙事节奏略慢" }
}
```

## 脚本

```js
const { generateScoreTemplate } = await import("./scripts/scorer.mjs");
const template = generateScoreTemplate(rubricText);
// 返回 JSON 分数
```

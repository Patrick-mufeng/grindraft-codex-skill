---
name: grindraft-persona
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
  - Grep
description: |
  从复盘评论数据派生/刷新公众号读者画像，写入 audience.md。和 rubric 平行的第二个派生物—rubric 答"怎么打分"，persona 答"谁在看"。触发词："构造受众画像"/"persona"/"我的读者是谁"/"看看我的受众画像"。
---

# grindraft-persona — 受众画像

## 流程

```
1. 遍历 articles/*/prediction.md 复盘段
2. 提取评论数据
3. 聚类：读者类型、关注点、语言风格
4. 合并到 audience.md
```

## 脚本

```js
const { extractComments, mergePersona } = await import("./scripts/persona.mjs");
const comments = extractComments(predictionContent);
mergePersona("./audience.md", { "技术从业者": { description: "关注 AI 技术细节", count: 1 } });
```

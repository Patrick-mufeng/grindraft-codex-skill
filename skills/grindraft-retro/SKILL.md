---
name: grindraft-retro
allowed-tools:
  - Bash
  - Read
  - Edit
  - Write
  - Glob
description: |
  T+N 天数据回收+复盘。逐假设验证预测、提炼派生比率、跨样本检测升级。触发词："复盘"/"retro"/"T+N 天数据来了"/"看数据"/"复盘这篇"。
---

# grindraft-retro — 数据回收与复盘

把 T+N 天的实际数据 → 逐假设验证预测 → 派生比率 → 提炼观察 → 跨样本检测 → 写入文件。

**只追加 `## 复盘` 段，绝不改预测段。**

## 流程

```
1. 读 prediction.md（只读，不写）
2. 用户输入实际数据（阅读量/收藏/分享/留言）
3. 逐假设验证：哪些预测对了？哪些错了？
4. 计算派生比率（如：收藏率 = 收藏/阅读）
5. 提炼观察 → 追加到复盘段
6. 跨样本检测：是否触发 bump？
```

## 脚本

```js
const { collectData, appendRetro } = await import("./scripts/retro.mjs");
const data = collectData(articleDir);
appendRetro(articleDir, { date: "2026-06-16", reads: 5000, saves: 200, validation: "HK 预测准确", observation: "标题钩子对阅读量影响明显" });
```

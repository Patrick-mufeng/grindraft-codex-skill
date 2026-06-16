---
name: grindraft-status
allowed-tools:
  - Bash
  - Read
  - Glob
description: |
  磨稿状态看板。显示当前模式/rubric 版本/校准进度/待复盘/选题池状态。自动获取当天日期计算复盘窗口。触发词："状态"/"今天干什么"/"进度怎么样"/"到哪了"。
---

# grindraft-status — 状态看板

## 流程

```
1. 读 .grindraft-state.json + candidates.md + articles/
2. 渲染状态看板
3. 写入 STATUS.md 并展示
```

## 看板模板

```markdown
# 状态看板

- 模式：{mode}
- Rubric 版本：{rubricVersion}
- 文章数：{articleCount}
- 候选数：{candidateCount}
- 已发布：{publishedCount}
- 待复盘：{pendingRetro}
```

## 脚本

```js
const { buildDashboard } = await import("./scripts/dashboard.mjs");
const dashboard = buildDashboard(projectRoot);
console.table(dashboard);
```

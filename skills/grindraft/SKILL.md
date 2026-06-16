---
name: grindraft
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Grep
  - Glob
description: |
  主路由 skill：检测用户当前阶段，调度到对应子 skill。触发词："磨稿"/"开始"/"grindraft"。
---

# grindraft — 主路由

## 职责

1. 检测用户当前处于哪个阶段（init / cold-start / calibrating / steady）
2. 根据阶段输出接下来的推荐操作
3. 不执行具体业务逻辑，仅路由

## 流程

```
用户说"磨稿"
  → 执行 node scripts/phase.mjs detectPhase <project-root>
  → 根据返回的阶段调度对应 skill
```

## 路由表

| 阶段 | 推荐操作 | 调度到 |
|------|---------|--------|
| init | 初始化项目 | grindraft-init |
| cold-start | 抓热点 → 聊选题 → 写文章 | grindraft-trends |
| calibrating | 继续写作循环 | 根据用户意图 |
| steady | 推荐选题 / 复盘 / 升级 | 根据用户意图 |

## 使用

```js
// 检测当前阶段
const { detectPhase } = await import("./scripts/phase.mjs");
const phase = detectPhase(process.cwd());
console.log(phase);
```

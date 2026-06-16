---
name: grindraft-init
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
description: |
  首次 onboarding 与脚手架创建。检测用户状态 → 创建项目骨架 → 配置参数。支持双模式：cold-start / calibration。触发词："初始化"/"init"/"磨稿初始化"/"首次使用"。
---

# grindraft-init — 初始化

## 流程

```
用户说"磨稿初始化"
  → 询问用户模式（cold-start / calibration）
  → node scripts/scaffold.mjs scaffold <project-root> <mode>
  → node scripts/scaffold.mjs createConfigFiles <project-root>
  → 引导用户编辑 style_guide.md
```

## 输出

- `.grindraft-state.json` — 项目状态文件
- `rubric_notes.md` — 评分规则（v0 等权）
- `style_guide.md` — 个人风格指南
- `WORKFLOW.md` — 工作流文档
- `STATUS.md` — 状态看板

## 脚本

```js
const { scaffold, createConfigFiles } = await import("./scripts/scaffold.mjs");
scaffold(projectRoot, "cold-start");
createConfigFiles(projectRoot);
```

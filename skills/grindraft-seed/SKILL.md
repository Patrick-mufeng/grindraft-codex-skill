---
name: grindraft-seed
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
description: |
  跟用户对话讨论选题—围绕用户的真实经历和观察深挖，收敛到一个具体角度。触发词："聊选题"/"我不知道写什么"/"seed"/"聊选题"/"帮我想个题目"。
---

# grindraft-seed — 选题对话

**核心是跟用户讨论选题**，不是 dump 候选列表。AI 的角色是聊 → 深挖 → 提炼角度 → 可选写 draft。

## 流程

```
用户说"聊选题"
  → 从 candidates.md 读取已有候选
  → 在 cwd 下找到 style_guide.md 了解用户偏好
  → 开始对话：今天有什么想写的主题？
  → 深挖 3-5 轮，收敛到一个角度
  → 读 candidates.md 去重
  → 可选：用 seed.mjs writeQuickDraft 写快速草稿
```

## 脚本

```js
const { appendCandidate } = await import("./scripts/seed.mjs");
appendCandidate(projectRoot, "标题", "角度");
```

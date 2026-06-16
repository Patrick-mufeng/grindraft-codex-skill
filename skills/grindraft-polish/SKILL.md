---
name: grindraft-polish
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
description: |
  打磨标题+封面提示语。读文章生成标题候选（猛料型/问句对话型/见证变化型），提取封面文案（标题≤5字+描述+标签）。触发词："打磨标题"/"polish"/"起标题"/"生成标题"。
---

# grindraft-polish — 打磨标题

## 流程

```
用户说"打磨标题"
  → 读文章
  → 生成 N 个标题候选（分类展示）
  → 用户选择/修改
  → 提取封面文案
  → 写入 prediction.md？不，只展示
```

## 标题分类

- **猛料型**：数字+惊喜
- **问句对话型**：问句开头，勾起好奇
- **见证变化型**："从X到Y" / "我如何…"

## 脚本

```js
const { generateTitleCandidates, extractCoverPrompts } = await import("./scripts/polish.mjs");
// 使用 AI 生成，脚本提供 prompt 结构
```

---
name: grindraft-humanize
allowed-tools:
  - Bash
  - Read
  - Edit
  - Glob
description: |
  四层去 AI 味自检体系（通用版）—从硬规则扫描到活人感终审，逐层修复 AI 写作 tells。由用户主动调用（说"去 AI 味"），不是自动流程的一部分。读 style_guide.md 了解用户个人禁区。触发词："去 AI 味"/"humanize"/"去味"/"修一下"/"四层自检"。
---

# grindraft-humanize — 四层去 AI 味

> 方法论继承自 khazix-writer 的 L1-L4 自检体系，**去掉卡马克个人风格的绑定**，做成通用版。

## 四层流程

```
L1 硬规则扫描 → L2 语气浪费检测 → L3 节奏扫描 → L4 活人感终审
```

| 层 | 做什么 | 脚本工具 |
|----|-------|---------|
| L1 | 删开头结尾套路、段落过渡、虚假推论 | detectTells(text).L1 |
| L2 | 删丑语填充（因此/然而/不隐瞒） | detectTells(text).L2 |
| L3 | 短句拆长句，动态调长度，查官方借口 | 手动执行 |
| L4 | 注入情绪，别把一把浮上晃荡子写太满 | 手动执行 |

## 脚本

```js
const { detectTells, removePatterns } = await import("./scripts/humanize.mjs");
const tells = detectTells(text);
console.log("L1 发现问题:", tells.L1.length);
```

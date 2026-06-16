---
name: grindraft-publish
allowed-tools:
  - Bash
  - Read
  - Edit
  - Glob
description: |
  文章发出后登记 URL，更新状态。只追加复盘段，不动预测段任何字符。触发词："已发布"/"publish"/"发布链接是 X"/"发出去了"。
---

# grindraft-publish — 发布登记

## 流程

```
用户说"已发布，链接是 xxx"
  → 确认文章目录
  → node scripts/publish.mjs registerArticle <project-root> <article-dir> <url>
  → 更新 STATUS.md
```

## 规则

- 只记录 URL 和发布时间
- **不修改 prediction.md**
- 自动更新 `.grindraft-state.json` 中的文章列表

## 脚本

```js
const { registerArticle } = await import("./scripts/publish.mjs");
registerArticle(projectRoot, articleDir, "https://mp.weixin.qq.com/s/xxx");
```

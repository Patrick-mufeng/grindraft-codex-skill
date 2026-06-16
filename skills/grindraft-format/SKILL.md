---
name: grindraft-format
allowed-tools:
  - Bash
  - Read
  - Write
  - Edit
  - Glob
description: |
  将 Markdown 排版为公众号兼容 HTML。自动设计主题色板+排版风格，每次不重复。支持手机预览。一键复制到公众号后台。内置预览版（含复制到公众号按钮）。触发词："排版"/"format"/"格式化"/"转公众号"。
---

# grindraft-format — 排版

## 流程

```
用户说"排版"
  → 读取终稿（优先 scripts/，fallback drafts/）
  → 自动提醒：去 AI 味？做封面？
  → AI 设计全新主题色板（不重复使用已有主题）
  → 生成两个文件：
    · 清洁版 HTML → 可直接粘贴公众号后台
    · 预览版 HTML → 双击看手机效果
  → 完成。下一步"启动预测"
```

## 排版规范

- 适配微信公众号 CSS 白名单
- 自动 section 嵌套
- flex 布局
- 图片圆角阴影
- 外链自动转底部引用

## 脚本

```js
const { pickTheme, mdToWechatHtml } = await import("./scripts/format-html.mjs");
const theme = pickTheme(usedThemeNames);
const html = mdToWechatHtml(markdown, theme);
```

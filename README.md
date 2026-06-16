# 磨稿 / Grindraft

> 公众号写作的全流程 Claude Code 插件——**写稿、去 AI 味、设计封面、一键排版、校准复盘**，18 个 skill 全搞定。

## 快速开始

```
磨稿初始化           → 建项目骨架
抓热点              → 拉 AI 圈今日资讯
聊选题              → 聊出一个角度
写文章              → AI 出初稿
去 AI 味            → 四层自检
设计封面            → 40 套模板，自动匹配
排版                → Markdown → 公众号 HTML，一键
启动预测            → 7 维盲打分（⚠️ 写完不能改）
已发布              → 登记 URL
复盘                → T+3 天数据回收
状态                → 看板总览
```

## 核心原则

1. **盲预测**：预测写完即锁定，不可修改
2. **升级必须全量重打**：rubric 升级时对所有历史文章用新公式重排序
3. **rubric 是工作台，不是博物馆**：被数据推翻的观察删除

## Skill 一览（18 个）

见 `skills/` 目录。每个 skill 包含：
- `SKILL.md` — 使用说明
- `agents/openai.yaml` — UI 元数据
- `scripts/` — 可执行 Node.js 脚本

## 共享工具

`lib/` 目录提供通用工具模块：

```js
import { today, readState, listArticles, computeComposite } from "./lib/index.mjs";
```

## 许可证

MIT

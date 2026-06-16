import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Scaffold a new grindraft project with full user profile.
 *
 * @param {string} projectRoot - Absolute path to user project
 * @param {object} config
 * @param {string} config.mode - "cold-start" | "calibration"
 * @param {number} config.followerCount - 公众号粉丝数
 * @param {string} config.targetFrequency - "weekly-2" | "weekly-1" | "weekly-0.5"
 * @param {string} config.autonomyDefault - "low" | "medium" | "high"
 * @param {boolean} config.styleMigration - 是否风格迁移
 * @param {string} config.rubricVersion - "v0" | "v1"
 * @param {number} config.calibrationSamples
 * @param {number} config.coldStartRemaining
 * @param {number} config.historicalSamples
 */
export function scaffold(projectRoot, config = {}) {
  const {
    mode = "cold-start",
    followerCount = 0,
    targetFrequency = "weekly-2",
    autonomyDefault = "medium",
    styleMigration = false,
    rubricVersion = "v0",
    calibrationSamples = 0,
    coldStartRemaining = 5,
    historicalSamples = 0,
  } = config;

  // Create directories
  const dirs = ["articles", "cover", "illustrations", ".grindraft-cache"];
  for (const d of dirs) {
    mkdirSync(join(projectRoot, d), { recursive: true });
  }

  // Compute bucket boundaries based on follower count
  const followerMultiplier = 1 + Math.floor(followerCount / 1000) * 0.1;
  const baseBuckets = { S: 50000, A: 10000, B: 3000, C: 1000, D: 300 };
  const bucketBoundaries = {};
  for (const [key, val] of Object.entries(baseBuckets)) {
    bucketBoundaries[key] = Math.round(val * followerMultiplier);
  }

  // Build state
  const state = {
    schema_version: 1,
    project_name: "grindraft-project",
    created_at: new Date().toISOString(),
    mode,
    content_form: "wechat-long-form",
    rubric_version: rubricVersion,

    user_profile: {
      follower_count: followerCount,
      target_frequency: targetFrequency,
      autonomy_default: autonomyDefault,
      style_migration: styleMigration,
      old_style_desc: "",
      new_style_desc: "",
    },

    calibration_samples: calibrationSamples,
    cold_start_remaining: coldStartRemaining,
    historical_samples: historicalSamples,
    rubric_fitted_from_history: false,

    rubric: {
      dimensions: ["HK", "NR", "QA", "UT", "DT", "EP", "SC"],
      weights: { HK: 1.0, NR: 1.0, QA: 1.0, UT: 1.0, DT: 1.0, EP: 1.0, SC: 1.0 },
      bucket_boundaries: bucketBoundaries,
    },

    in_progress_session: {
      type: null,
      file: null,
      started_at: null,
    },

    last_trends_run_at: null,
    last_prediction_at: null,
    last_published_at: null,
    last_retro_at: null,
    last_prediction_self_scored: false,
    last_self_scored_at: null,

    pending_retros: [],
    consecutive_directional_errors: [],
    enabled_trend_sources: ["aihot"],

    baseline_metrics: {
      avg_reads: null,
      share_rate: null,
      collection_rate: null,
      comment_rate: null,
      like_rate: null,
      calculated_at: null,
      sample_count: 0,
    },

    style_guide: {
      version: 1,
      last_updated: new Date().toISOString(),
      patterns_learned: 0,
    },
  };

  writeFileSync(join(projectRoot, ".grindraft-state.json"), JSON.stringify(state, null, 2));
}

/**
 * Create skeleton config files from templates.
 * Never overwrites existing files — warns instead.
 *
 * @param {string} projectRoot
 * @param {object} options
 * @param {boolean} options.force - Overwrite existing files
 */
export function createConfigFiles(projectRoot, options = {}) {
  const { force = false } = options;

  const files = {
    "rubric_notes.md": "# Rubric Notes — 公众号长文评分规则\n\n> 本文件是磨稿系统的评分真实来源。每次复盘后更新。\n> 当前 rubric 版本：v0（cold-start 等权）\n\n---\n\n## 当前公式\n\n**版本**：v0\n**公式**：raw = (HK + NR + QA + UT + DT + EP + SC) / 7，composite = raw × 5\n**适用期**：前 5 篇（cold-start）\n\n| 维度 | 简称 | 权重 |\n|---|---|---|\n| 标题钩力 | HK | ×1.0 |\n| 叙事牵引力 | NR | ×1.0 |\n| 金句锚点 | QA | ×1.0 |\n| 实用密度 | UT | ×1.0 |\n| 思辨激发度 | DT | ×1.0 |\n| 情绪峰值 | EP | ×1.0 |\n| 结构闭环 | SC | ×1.0 |\n\n---\n\n## 重大跨样本观察\n\n暂无——等你发前 5 篇后开始积累。\n\n---\n\n## 观察记录\n\n暂无。每次复盘后，grindraft-retro 会在这里追加。\n\n---\n\n## 历史公式\n\n| 版本 | 日期 | 变更摘要 |\n|---|---|---|\n| v0 | — | 初始等权（cold-start），基于阅读心理先验 |\n",

    "style_guide.md": "# 风格指南 / Style Guide\n\n> 本文件从你的修改中沉淀——AI 初稿 vs 你的终稿之间的差异，就是你的风格基因。\n> 每次你改完稿子回来，系统自动 diff 你的改动，提取反复出现的 pattern 去重写入这里。\n\n---\n\n## 我的写作人格\n\n**一句话**：（待填——你想让读者读完文章后产生什么感觉？）\n\n**核心价值观**（写作时时刻贯穿）：\n1. （待填）\n2. （待填）\n3. （待填）\n\n---\n\n## AI 角色边界\n\n### AI 可以做的\n- 扩充素材、找类比、补充背景知识\n- 按我的大纲和要点写初稿\n- 提供结构建议\n- 检查逻辑漏洞\n\n### 必须我来的\n- 一手观察和真实经历\n- 核心创意角度\n- 情绪的真实表达\n- 最后定稿的判断\n\n---\n\n## 风格参数\n\n| 参数 | 设定 | 说明 |\n|---|---|---|\n| 默认字数 | auto | 根据选题自动建议 |\n| 段落风格 | 短段 | 多数段落 2-4 句 |\n| 小标题 | 少用 | 尽量用口语化转场而非 markdown 标题 |\n| 加粗 | 克制 | 只在核心结论处加粗 |\n| 数字列表 | 可用 | 方法论/步骤类文章允许编号 |\n\n---\n\n## 绝对禁区（我的个人 AI 味雷区）\n\n（从你的修改中逐步沉淀。初始为空。）\n\n- （待发现）\n\n---\n\n## 改稿历史观察\n\n| 日期 | 文章 | AI 做了什么 | 我改了什么 | 学到的 pattern |\n|---|---|---|---|---|\n| | | | | |\n",

    "WORKFLOW.md": "# 磨稿工作流\n\n## 创作阶段\n\n1. **抓热点** → 拉 AI 圈精选资讯\n2. **找选题** → 聊出一个想写的角度\n3. **写文章** → AI 出初稿（3 级自主度）\n4. **去 AI 味** → 四层自检\n5. **配图** → 生成小黑风格正文插图\n6. **设计封面** → 选模板生成封面\n7. **排版** → 转公众号 HTML\n\n## 校准阶段\n\n8. **启动预测** → 7 维盲打分\n9. **已发布** → 登记 URL\n10. **复盘** → T+3 天回收数据\n11. **推导画像** → 从留言推导读者画像\n12. **升级** → Rubric 升级 + 全量重打分\n\n## 辅助\n\n- **状态** → 看板总览\n- **推荐选题** → 选题池排序\n",

    "candidates.md": "# 选题池 / Topic Pool\n\n| 序号 | 标题 | 角度 | 来源 | 状态 | 创建日期 |\n|------|------|------|------|------|---------|\n| | | | | | |\n",

    "benchmark.md": "# Benchmark / 历史文章评分基准\n\n> 记录导入的历史文章及其 7 维评分，用于 rubric 初始权重拟合。\n\n| 标题 | 日期 | HK | NR | QA | UT | DT | EP | SC | composite | bucket | 实际阅读量 |\n|------|------|----|----|----|----|----|----|----|-----------|--------|-----------|\n| | | | | | | | | | | | |\n",

    "audience.md": "# 受众画像 / Audience Persona\n\n> 从留言数据和复盘观察推导的读者画像。由 grindraft-persona 维护。\n\n## 核心读者画像\n\n（待填充）\n\n## 留言特征\n\n（待积累）\n\n## 内容偏好\n\n（待积累）\n",
  };

  for (const [name, content] of Object.entries(files)) {
    const p = join(projectRoot, name);
    if (existsSync(p) && !force) {
      console.warn(`⚠️  文件已存在，跳过: ${name}（使用 force=true 可覆盖）`);
      continue;
    }
    writeFileSync(p, content, "utf-8");
  }
}

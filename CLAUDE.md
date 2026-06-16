# CLAUDE.md

Grindraft (纾ㄧ) 鈥?Claude Code plugin for WeChat long-form article writing with a calibrated prediction loop.

## Architecture

18 independent skills covering the full content creation lifecycle:

| Phase | Skill | Description |
|-------|-------|-------------|
| Entry | grindraft-init | Onboarding & project scaffolding |
| Discovery | grindraft-trends | Fetch AI trends from aihot API |
| Ideation | grindraft-seed | Topic exploration through dialogue |
| Writing | grindraft-write | AI draft generation (3 autonomy levels) |
| Polish | grindraft-humanize | 4-layer AI-tells removal |
| Polish | grindraft-illustrate | Inline illustration generation (Xiaohei style) |
| Polish | grindraft-cover | Cover design from 40 templates |
| Polish | grindraft-polish | Title candidates + cover prompts |
| Format | grindraft-format | Markdown 鈫?WeChat-compatible HTML |
| Calibrate | grindraft-predict | Blind prediction (7-dim rubric) |
| Calibrate | grindraft-publish | Publish registration |
| Calibrate | grindraft-retro | Data recall & retrospective |
| Calibrate | grindraft-persona | Audience persona derivation |
| Calibrate | grindraft-bump | Rubric upgrade with cross-model audit |
| Utility | grindraft-recommend | Topic pool ranking |
| Utility | grindraft-status | Status dashboard |
| Internal | grindraft-score-blind | Isolated blind scoring sub-agent |
| Meta | grindraft | Router & global protocol |

Each skill contains SKILL.md (YAML front matter), gents/openai.yaml (UI metadata), and scripts/ (executable Node.js modules). Shared utilities live in lib/. Shared references live in shared-references/, 	emplates/, starter-rubrics/, dapters/, cover-templates/.

## Three Inviolable Principles

1. **Blind prediction**: Predictions are written before seeing any actual data and are immutable once written
2. **Bump = full re-score**: Rubric upgrades require re-scoring all calibration samples; 鈮?/5 rank consistency required
3. **Rubric is a workbench, not a museum**: Observations disproven by data get deleted 鈥?git history is the archive

## Date Rule (Highest Priority)

Always fetch the real current date via system command before any time-sensitive operation.

## Key Dependencies

- **Node.js 18+**: Required for all skill scripts in scripts/
- **lib/ utilities**: lib/index.mjs exports shared helpers (state, article, rubric, date)
- **aihot API**: Public, no auth required

## Shared lib Usage

`js
import { today, readState, listArticles, computeComposite } from "../../lib/index.mjs";
`

## Adding New Content Formats

- New format 鈫?add starter-rubrics/<format>.md
- New trend source 鈫?add dapters/trend-sources/<name>.md
- Modify principles 鈫?edit shared-references/<protocol>.md
- Modify routing 鈫?edit skills/grindraft/SKILL.md routing table

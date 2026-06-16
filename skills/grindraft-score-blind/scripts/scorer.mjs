// INTERNAL: Channel B isolated scorer. Only reads rubric_notes.md.
// Imported by grindraft-predict via sub-agent context.

export const DIMENSIONS = ["HK", "NR", "QA", "UT", "DT", "EP", "SC"];
export const DIM_LABELS = {
  HK: "鏍囬閽╁姏",
  NR: "鍙欎簨鐗靛紩鍔?",
  QA: "閲戝彞閿氱偣",
  UT: "瀹炵敤瀵嗗害",
  DT: "鎬濊鲸婵€鍙戝害",
  EP: "鎯呯华宄板€?",
  SC: "缁撴瀯闂幆",
};

export function generateScoreTemplate(rubricText) {
  return {
    dimensions: DIMENSIONS.map((d) => ({
      code: d,
      label: DIM_LABELS[d],
      score: null, // to be filled by scorer
      rationale: "",
    })),
    instructions: "璇峰搴?rubric_notes.md 涓殑瑙勫垯锛岀粰姣忎釜缁村害鎵?1-5 鍒嗭紝骞跺啓鍑虹悊鐢便€傝緭鍑轰弗鏍?JSON銆?",
  };
}

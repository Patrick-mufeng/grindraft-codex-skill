export function buildPrompt(angle, audience, styleGuide, autonomy) {
  const templates = {
    low: "鍐欎竴绡囨牴鎹?璇嗙偣鐨勫垵绋匡紝浣嗗彧鍐?50%锛屽墿涓嬬敤 [TODO] 鏍囪銆傛垜鑷繁鐮佸畬鏁村渾銆?",
    medium: "鏍规嵁瑙掑害鍐欏畬鏁村垵绋匡紝浣嗙粰鎴?涓湴鏂硅?鎴戞敼鍐欍€傛爣璁板嚭鏉ャ€?",
    high: "璇蜂綔涓轰笓涓氬叕浼楀彿鍐欐墜锛屾牴鎹堿ngle鍐欏畬鏁翠竴绡囥€?",
  };
  return {
    role: "浣犳槸涓撲笟鐨勫叕浼楀彿鍐欐墜锛岀涓€浜虹О锛屽畾浣嶄负"鎴戝府浣犲嚭浜嗙涓€绋匡紝浣犵湅鍝噷闇€瑕佹敼"銆?,
    angle,
    audience,
    styleGuide,
    autonomy: templates[autonomy] || templates.medium,
  };
}

export function generateTitleCandidates(articleText, count = 5) {
  return {
    instruction: "璇绘枃绔犲悗灞曠ず鏍囬鍊欓€?锛屾瘡涓甫 reasoning銆備娇鐢ㄤ互涓嬪垎绫伙細\n- 鐚涙枡鍨嬶紙鏁板瓧+鎯婂枩锛?/闂彶瀵硅瘽鍨?/ 瑙佽瘉鍙樺寲鍨?",
  };
}

export function extractCoverPrompts(articleText) {
  return {
    instruction: "灏佺敾鎻愮ず锛氭牴鎹粡鍏哥殑鎻愮ず鎻愮偧鏂囨锛堟爣棰樷墺5瀛楋級銆佹弿杩般€佹爣绛俱€?",
  };
}

const L1_PATTERNS = [
  /(棣栧厛|鍏舵|鏈€鍚?|绾暀)|(鎬荤粨|鎹|褰撳墠|鑰岃█涔?/g,
  /鈥滄棤鐤戙€佲€?|鈥滀笉闅剧湅鍑衡€?|鈥滄湁鐩叡鐪尖€?|鈥滃€艰涓€鎻愮殑鏄€?/g,
];
const L2_PATTERNS = [
  /鍥犳|鐒惰€?|鑰岃█涔?|鍦ㄦ鍩虹涓?|浠庢煇绉嶆剰涔変笂/g,
  /涓嶉殣钘忥紝|瀹炲疄鍦ㄥ湪|鎴戣寰?|鑰岃█锛?/g,
];

export function detectTells(text) {
  const layers = { L1: [], L2: [], L3: [], L4: [] };
  for (const p of L1_PATTERNS) {
    const matches = text.match(p);
    if (matches) layers.L1.push(...matches);
  }
  for (const p of L2_PATTERNS) {
    const matches = text.match(p);
    if (matches) layers.L2.push(...matches);
  }
  return layers;
}

export function removePatterns(text, patterns) {
  let result = text;
  for (const p of patterns) {
    result = result.replace(p, "");
  }
  return result;
}

export const L1_DESCRIPTION = "纭鍒欐壂鎻忥細鍒犳帀妯″紡鍖栧紑澶寸粨灏俱€佹钀借繃娓°€佽櫄鍋囨帹璁猴紙棣栧厛/鍏舵/鎬荤粨锛?";
export const L2_DESCRIPTION = "璇皵娴垂妫€鏌ワ細鍒犳帀涓戣濉炲～锛堝洜姝?/鐒惰€?/涓嶉殣钘忥級";
export const L3_DESCRIPTION = "鑺傚鎵弿锛氱煭鍙ユ媶闀垮彞锛屽姩鎬佽皟鏁撮暱搴︼紱鏌ョ湅瀹樻柟鍊熷彛锛堣褰?/瑙傚療/鏁版嵁鏄剧ず/鐮旂┒琛ㄦ槑锛?";
export const L4_DESCRIPTION = "娲讳汉鎰熺粓瀹★細闃呰鏃惰娉ㄥ叆涓€縐嶆儏缁紝涓嶈鎶婁竴鎶婃祮涓婃檶鏅冨瓙鍐欏お婊★紱娉ㄦ剰鎸ョ殑绛涘瓙绾犻敊銆?";

export function analyzeArticle(text) {
  // Simplified mood/domain classification
  const moodKeywords = {
    cold: ["鏁版嵁", "绉戠爺", "鎶€鏈?,"绠楁硶", "绯荤粺", "鏋舵瀯", "鎶ュ憡", "demo"],
    warm: ["鏁呬簨", "浜虹敓", "鎴愰暱", "鎰熷姩", "鎮栨伡", "娓╂殩", "鍥㈤槦"],
    excited: ["鐖嗭綖", "榛戞殫", "鍙嶈浆", "鎯婅", "缈昏剢", "璧烽浜?],
    light: ["鐜╃瑧", "骞虫贰", "鏃ュ父", "淇变箰閮?,"鐑柉", "鑽夎崏"],
    serious: ["鎬濊€?,"瑁滃叏", "鑷療", "绀句細", "鏂囧寲", "濞佽儊", "椋庨櫓"],
  };
  const domainKeywords = {
    tech: ["AI", "GPT", "寮€鍙?,"鏁版嵁", "绠楁硶", "绯荤粺", "宸ュ叿"],
    business: ["鍒涗笟", "鑲′唤", "甯傚満", "鎴樼暐", "鏀剁泭", "浜т笟"],
    life: ["鐢熸椿", "鍋ュ悍", "搴滃彴", "鎰熸儏", "瀹跺涵", "璐墿"],
    education: ["瀛︿範", "鏁欒偛", "鐮旂┒", "鏂囧尮", "璇剧▼", "瀛︽湳"],
    entertainment: ["鐢靛奖", "娓告垙", "闊充箰", "鐗囬€?,"鏄熺▼", "鍓ф儏"],
    humanity: ["鏂囧寲", "淇℃淮", "绀句細", "含鍙?,"钀戒紶", "濂囧紓"],
  };
  return { mood: "neutral", domain: "tech" };
}

export function matchTemplate(article, templates, count = 3) {
  // Placeholder: score templates and return top N
  const scored = templates.map((t) => ({
    ...t,
    score: Math.random() * 10,
  }));
  return scored.sort((a, b) => b.score - a.score).slice(0, count);
}

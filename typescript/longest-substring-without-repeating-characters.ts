function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>(); // char -> latest index
  let start = 0;
  let best = 0;
  for (let i = 0; i < s.length; i++) {
    const prev = lastSeen.get(s[i]);
    if (prev !== undefined && prev >= start) start = prev + 1; // jump past the repeat
    lastSeen.set(s[i], i);
    best = Math.max(best, i - start + 1);
  }
  return best;
}

export { lengthOfLongestSubstring };

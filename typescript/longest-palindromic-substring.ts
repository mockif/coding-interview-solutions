function longestPalindrome(s: string): string {
  if (s.length < 2) return s;
  let start = 0;
  let bestLen = 1;

  const expand = (left: number, right: number): void => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++;
    }
    const length = right - left - 1;
    if (length > bestLen) {
      start = left + 1;
      bestLen = length;
    }
  };

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // odd length, centred on s[i]
    expand(i, i + 1); // even length, centred between s[i] and s[i + 1]
  }
  return s.slice(start, start + bestLen);
}

export { longestPalindrome };

function mergeIntervals(intervals: number[][]): number[][] {
  if (intervals.length === 0) return [];
  const sorted = [...intervals].sort((a, b) => a[0] - b[0]);
  const merged: number[][] = [[...sorted[0]]];
  for (const [start, end] of sorted.slice(1)) {
    const last = merged[merged.length - 1];
    if (start <= last[1]) {
      last[1] = Math.max(last[1], end); // overlaps (or touches) the last block
    } else {
      merged.push([start, end]);
    }
  }
  return merged;
}

export { mergeIntervals };

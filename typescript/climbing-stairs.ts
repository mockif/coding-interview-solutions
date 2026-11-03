function climbStairs(n: number): number {
  if (n <= 2) return n;
  let oneBack = 2; // ways to reach step 2
  let twoBack = 1; // ways to reach step 1
  for (let step = 3; step <= n; step++) {
    const ways = oneBack + twoBack;
    twoBack = oneBack;
    oneBack = ways;
  }
  return oneBack;
}

export { climbStairs };

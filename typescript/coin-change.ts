function coinChange(coins: number[], amount: number): number {
  const INF = amount + 1; // more coins than could ever be needed
  const dp = new Array<number>(amount + 1).fill(INF); // dp[a] = fewest coins to make a
  dp[0] = 0;
  for (let a = 1; a <= amount; a++) {
    for (const coin of coins) {
      if (coin <= a && dp[a - coin] + 1 < dp[a]) dp[a] = dp[a - coin] + 1;
    }
  }
  return dp[amount] === INF ? -1 : dp[amount];
}

export { coinChange };

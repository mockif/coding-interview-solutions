def coin_change(coins: list[int], amount: int) -> int:
    INF = amount + 1  # more coins than could ever be needed
    dp = [0] + [INF] * amount  # dp[a] = fewest coins to make a
    for a in range(1, amount + 1):
        for coin in coins:
            if coin <= a and dp[a - coin] + 1 < dp[a]:
                dp[a] = dp[a - coin] + 1
    return dp[amount] if dp[amount] != INF else -1

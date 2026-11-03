def length_of_longest_substring(s: str) -> int:
    last_seen: dict[str, int] = {}  # char -> latest index
    start = 0
    best = 0
    for i, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= start:
            start = last_seen[ch] + 1  # jump past the repeat
        last_seen[ch] = i
        best = max(best, i - start + 1)
    return best

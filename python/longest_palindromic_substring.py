def longest_palindrome(s: str) -> str:
    if len(s) < 2:
        return s
    start, best_len = 0, 1

    def expand(left: int, right: int) -> None:
        nonlocal start, best_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        length = right - left - 1
        if length > best_len:
            start, best_len = left + 1, length

    for i in range(len(s)):
        expand(i, i)      # odd length, centred on s[i]
        expand(i, i + 1)  # even length, centred between s[i] and s[i+1]
    return s[start:start + best_len]

from collections import Counter


def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    counts = Counter(s)
    for ch in t:
        counts[ch] -= 1
        if counts[ch] < 0:
            return False
    return True

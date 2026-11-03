from collections import defaultdict


def group_anagrams(words: list[str]) -> list[list[str]]:
    groups: dict[str, list[str]] = defaultdict(list)
    for word in words:
        key = "".join(sorted(word))  # anagrams share the same sorted letters
        groups[key].append(word)
    return list(groups.values())

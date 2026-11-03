"""Tests for every Python solution. Run: python tests/test_python.py"""
import itertools
import random
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "python"))

from binary_search import binary_search
from climbing_stairs import climb_stairs
from coin_change import coin_change
from course_schedule import can_finish
from group_anagrams import group_anagrams
from heapify import build_max_heap, heap_sort
from kth_largest_element import find_kth_largest, find_kth_largest_quickselect
from longest_palindromic_substring import longest_palindrome
from longest_substring_without_repeating_characters import length_of_longest_substring
from lru_cache import LRUCache, LRUCacheManual
from maximum_subarray import max_subarray
from merge_intervals import merge_intervals
from number_of_islands import num_islands
from product_of_array_except_self import product_except_self
from reverse_linked_list import ListNode, reverse_list, reverse_list_recursive
from three_sum import three_sum
from topological_sort import course_order, course_order_dfs
from two_sum import two_sum
from valid_anagram import is_anagram
from valid_parentheses import is_valid

rng = random.Random(7)


def valid_order(n, prereqs, order):
    if sorted(order) != list(range(n)):
        return False
    pos = {c: i for i, c in enumerate(order)}
    return all(pos[before] < pos[course] for course, before in prereqs)


def has_cycle(n, prereqs):
    graph = {i: [] for i in range(n)}
    for course, before in prereqs:
        graph[before].append(course)
    state = [0] * n

    def dfs(u):
        state[u] = 1
        for v in graph[u]:
            if state[v] == 1 or (state[v] == 0 and dfs(v)):
                return True
        state[u] = 2
        return False

    return any(state[i] == 0 and dfs(i) for i in range(n))


def test_all():
    # Two sum
    assert sorted(two_sum([2, 7, 11, 15], 9)) == [0, 1]
    assert sorted(two_sum([3, 3], 6)) == [0, 1]
    for _ in range(200):
        nums = [rng.randint(-20, 20) for _ in range(rng.randint(2, 12))]
        i, j = rng.sample(range(len(nums)), 2)
        target = nums[i] + nums[j]
        a, b = two_sum(nums, target)
        assert a != b and nums[a] + nums[b] == target

    # Three sum
    assert sorted(map(sorted, three_sum([-1, 0, 1, 2, -1, -4]))) == [[-1, -1, 2], [-1, 0, 1]]
    for _ in range(200):
        nums = [rng.randint(-6, 6) for _ in range(rng.randint(0, 10))]
        brute = {tuple(sorted(t)) for t in itertools.combinations(nums, 3) if sum(t) == 0}
        got = [tuple(sorted(t)) for t in three_sum(nums)]
        assert len(got) == len(set(got)) and set(got) == brute

    # Valid parentheses
    for s, ok in [("()", True), ("()[]{}", True), ("(]", False), ("([)]", False), ("{[]}", True), ("", True), ("(", False), (")", False)]:
        assert is_valid(s) == ok, s

    # Binary search
    for _ in range(300):
        nums = sorted(set(rng.randint(-50, 50) for _ in range(rng.randint(0, 15))))
        target = rng.randint(-55, 55)
        assert binary_search(nums, target) == (nums.index(target) if target in nums else -1)

    # Reverse a linked list
    for reverse in (reverse_list, reverse_list_recursive):
        for n in range(6):
            head = None
            for v in reversed(range(n)):
                head = ListNode(v, head)
            out, node = [], reverse(head)
            while node:
                out.append(node.val)
                node = node.next
            assert out == list(reversed(range(n)))

    # Merge intervals
    assert merge_intervals([[1, 3], [2, 6], [8, 10], [15, 18]]) == [[1, 6], [8, 10], [15, 18]]
    assert merge_intervals([[1, 4], [4, 5]]) == [[1, 5]]
    assert merge_intervals([]) == []

    # Longest palindromic substring
    for _ in range(200):
        s = "".join(rng.choice("ab") for _ in range(rng.randint(1, 12)))
        best = max((s[i:j] for i in range(len(s)) for j in range(i + 1, len(s) + 1) if s[i:j] == s[i:j][::-1]), key=len)
        got = longest_palindrome(s)
        assert got == got[::-1] and got in s and len(got) == len(best)

    # LRU cache
    for cls in (LRUCache, LRUCacheManual):
        c = cls(2)
        c.put(1, 1); c.put(2, 2)
        assert c.get(1) == 1
        c.put(3, 3)
        assert c.get(2) == -1
        c.put(4, 4)
        assert c.get(1) == -1 and c.get(3) == 3 and c.get(4) == 4

    # Topological sort and course schedule
    assert valid_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]], course_order(4, [[1, 0], [2, 0], [3, 1], [3, 2]]))
    assert course_order(2, [[0, 1], [1, 0]]) == [] and course_order_dfs(2, [[0, 1], [1, 0]]) == []
    for _ in range(300):
        n = rng.randint(1, 7)
        prereqs = [[a, b] for a in range(n) for b in range(n) if a != b and rng.random() < 0.2]
        cyc = has_cycle(n, prereqs)
        assert can_finish(n, prereqs) == (not cyc)
        for order_fn in (course_order, course_order_dfs):
            order = order_fn(n, prereqs)
            assert (order == []) if cyc else valid_order(n, prereqs, order)

    # Heapify and heap sort
    for _ in range(200):
        a = [rng.randint(-30, 30) for _ in range(rng.randint(0, 20))]
        h = a[:]
        build_max_heap(h)
        assert all(h[i] >= h[c] for i in range(len(h)) for c in (2 * i + 1, 2 * i + 2) if c < len(h))
        s = a[:]
        heap_sort(s)
        assert s == sorted(a)

    # Valid anagram and group anagrams
    assert is_anagram("anagram", "nagaram") and not is_anagram("rat", "car") and not is_anagram("a", "ab")
    groups = group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
    assert sorted(sorted(g) for g in groups) == [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]

    # Maximum subarray
    for _ in range(300):
        nums = [rng.randint(-10, 10) for _ in range(rng.randint(1, 12))]
        brute = max(sum(nums[i:j]) for i in range(len(nums)) for j in range(i + 1, len(nums) + 1))
        assert max_subarray(nums) == brute

    # Climbing stairs
    fib = [1, 1]
    for _ in range(40):
        fib.append(fib[-1] + fib[-2])
    for n in range(1, 40):
        assert climb_stairs(n) == fib[n]

    # Number of islands
    grid = [list("11000"), list("11000"), list("00100"), list("00011")]
    assert num_islands(grid) == 3

    # Longest substring without repeating characters
    for _ in range(300):
        s = "".join(rng.choice("abcd") for _ in range(rng.randint(0, 12)))
        brute = max([j - i for i in range(len(s)) for j in range(i + 1, len(s) + 1) if len(set(s[i:j])) == j - i] or [0])
        assert length_of_longest_substring(s) == brute

    # Product of array except self
    for _ in range(300):
        nums = [rng.randint(-3, 3) for _ in range(rng.randint(2, 8))]
        brute = []
        for i in range(len(nums)):
            p = 1
            for j, v in enumerate(nums):
                if j != i:
                    p *= v
            brute.append(p)
        assert product_except_self(nums) == brute

    # Coin change
    assert coin_change([1, 2, 5], 11) == 3 and coin_change([2], 3) == -1 and coin_change([1], 0) == 0
    assert coin_change([1, 3, 4], 6) == 2  # greedy would pick 4 + 1 + 1

    # Kth largest element
    for _ in range(300):
        nums = [rng.randint(-20, 20) for _ in range(rng.randint(1, 15))]
        k = rng.randint(1, len(nums))
        want = sorted(nums, reverse=True)[k - 1]
        assert find_kth_largest(nums[:], k) == want and find_kth_largest_quickselect(nums[:], k) == want


if __name__ == "__main__":
    test_all()
    print("All Python solutions passed.")

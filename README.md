# Coding interview solutions in Python and TypeScript

Clean, tested solutions to 20 classic coding interview problems, in Python and TypeScript.

Each problem has a full write-up on MockIF covering:
- the brute force first
- the optimal approach and its complexity
- how to explain the solution out loud in an interview
- the follow-up questions interviewers usually ask next

## Problems

| Problem | Pattern | Python | TypeScript | Write-up |
|---|---|---|---|---|
| Two Sum | Hash map | [python/two_sum.py](python/two_sum.py) | [typescript/two-sum.ts](typescript/two-sum.ts) | [Explanation](https://mockif.com/questions/coding/two-sum) |
| Valid Anagram | Hash map | [python/valid_anagram.py](python/valid_anagram.py) | [typescript/valid-anagram.ts](typescript/valid-anagram.ts) | [Explanation](https://mockif.com/questions/coding/valid-anagram) |
| Group Anagrams | Hash map | [python/group_anagrams.py](python/group_anagrams.py) | [typescript/group-anagrams.ts](typescript/group-anagrams.ts) | [Explanation](https://mockif.com/questions/coding/group-anagrams) |
| Three Sum | Two pointers | [python/three_sum.py](python/three_sum.py) | [typescript/three-sum.ts](typescript/three-sum.ts) | [Explanation](https://mockif.com/questions/coding/three-sum) |
| Longest Substring Without Repeating Characters, Explained | Sliding window | [python/longest_substring_without_repeating_characters.py](python/longest_substring_without_repeating_characters.py) | [typescript/longest-substring-without-repeating-characters.ts](typescript/longest-substring-without-repeating-characters.ts) | [Explanation](https://mockif.com/questions/coding/longest-substring-without-repeating-characters) |
| Product of Array Except Self | Prefix products | [python/product_of_array_except_self.py](python/product_of_array_except_self.py) | [typescript/product-of-array-except-self.ts](typescript/product-of-array-except-self.ts) | [Explanation](https://mockif.com/questions/coding/product-of-array-except-self) |
| Valid Parentheses | Stack | [python/valid_parentheses.py](python/valid_parentheses.py) | [typescript/valid-parentheses.ts](typescript/valid-parentheses.ts) | [Explanation](https://mockif.com/questions/coding/valid-parentheses) |
| Binary Search | Binary search | [python/binary_search.py](python/binary_search.py) | [typescript/binary-search.ts](typescript/binary-search.ts) | [Explanation](https://mockif.com/questions/coding/binary-search) |
| Reverse a Linked List | Linked list | [python/reverse_linked_list.py](python/reverse_linked_list.py) | [typescript/reverse-linked-list.ts](typescript/reverse-linked-list.ts) | [Explanation](https://mockif.com/questions/coding/reverse-linked-list) |
| Merge Intervals in Python and TypeScript, Explained | Sorting | [python/merge_intervals.py](python/merge_intervals.py) | [typescript/merge-intervals.ts](typescript/merge-intervals.ts) | [Explanation](https://mockif.com/questions/coding/merge-intervals) |
| Longest Palindromic Substring in Python and TypeScript | Expand around centre | [python/longest_palindromic_substring.py](python/longest_palindromic_substring.py) | [typescript/longest-palindromic-substring.ts](typescript/longest-palindromic-substring.ts) | [Explanation](https://mockif.com/questions/coding/longest-palindromic-substring) |
| Maximum Subarray | Dynamic programming | [python/maximum_subarray.py](python/maximum_subarray.py) | [typescript/maximum-subarray.ts](typescript/maximum-subarray.ts) | [Explanation](https://mockif.com/questions/coding/maximum-subarray) |
| Climbing Stairs | Dynamic programming | [python/climbing_stairs.py](python/climbing_stairs.py) | [typescript/climbing-stairs.ts](typescript/climbing-stairs.ts) | [Explanation](https://mockif.com/questions/coding/climbing-stairs) |
| Coin Change | Dynamic programming | [python/coin_change.py](python/coin_change.py) | [typescript/coin-change.ts](typescript/coin-change.ts) | [Explanation](https://mockif.com/questions/coding/coin-change) |
| Number of Islands | Graph | [python/number_of_islands.py](python/number_of_islands.py) | [typescript/number-of-islands.ts](typescript/number-of-islands.ts) | [Explanation](https://mockif.com/questions/coding/number-of-islands) |
| Course Schedule | Graph | [python/course_schedule.py](python/course_schedule.py) | [typescript/course-schedule.ts](typescript/course-schedule.ts) | [Explanation](https://mockif.com/questions/coding/course-schedule) |
| Topological Sort | Graph | [python/topological_sort.py](python/topological_sort.py) | [typescript/topological-sort.ts](typescript/topological-sort.ts) | [Explanation](https://mockif.com/questions/coding/topological-sort) |
| Kth Largest Element in an Array | Heap | [python/kth_largest_element.py](python/kth_largest_element.py) | [typescript/kth-largest-element.ts](typescript/kth-largest-element.ts) | [Explanation](https://mockif.com/questions/coding/kth-largest-element) |
| Max Heapify and Build a Max Heap in Python and TypeScript | Heap | [python/heapify.py](python/heapify.py) | [typescript/heapify.ts](typescript/heapify.ts) | [Explanation](https://mockif.com/questions/coding/heapify) |
| LRU Cache | Design | [python/lru_cache.py](python/lru_cache.py) | [typescript/lru-cache.ts](typescript/lru-cache.ts) | [Explanation](https://mockif.com/questions/coding/lru-cache) |

## Run the tests

The tests check fixed examples and compare against brute-force answers on random inputs.

```bash
python tests/test_python.py                                 # Python 3.10+
node --experimental-strip-types tests/test_typescript.ts    # Node 22.6+
```

## How to use this repo

1. Try each problem yourself for 20 to 25 minutes before you open the solution.
2. Say the brute force out loud, with its complexity, before you optimise it.
3. Test your solution by hand with one normal case and one edge case.
4. Practise explaining it while you code, because that is the part interviews score.

To rehearse the spoken part, [MockIF](https://mockif.com/mock-coding-interview) runs mock coding rounds with a voice AI interviewer in Python and TypeScript.

## License

MIT. See [LICENSE](LICENSE).

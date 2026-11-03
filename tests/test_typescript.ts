// Tests for every TypeScript solution.
// Run: node --experimental-strip-types tests/test_typescript.ts (Node 22.6+)
import assert from "node:assert/strict";
import { binarySearch } from "../typescript/binary-search.ts";
import { climbStairs } from "../typescript/climbing-stairs.ts";
import { coinChange } from "../typescript/coin-change.ts";
import { canFinish } from "../typescript/course-schedule.ts";
import { groupAnagrams } from "../typescript/group-anagrams.ts";
import { buildMaxHeap, heapSort } from "../typescript/heapify.ts";
import { findKthLargest } from "../typescript/kth-largest-element.ts";
import { longestPalindrome } from "../typescript/longest-palindromic-substring.ts";
import { lengthOfLongestSubstring } from "../typescript/longest-substring-without-repeating-characters.ts";
import { LRUCache } from "../typescript/lru-cache.ts";
import { maxSubArray } from "../typescript/maximum-subarray.ts";
import { mergeIntervals } from "../typescript/merge-intervals.ts";
import { numIslands } from "../typescript/number-of-islands.ts";
import { productExceptSelf } from "../typescript/product-of-array-except-self.ts";
import { ListNode, reverseList, reverseListRecursive } from "../typescript/reverse-linked-list.ts";
import { threeSum } from "../typescript/three-sum.ts";
import { courseOrder, courseOrderDfs } from "../typescript/topological-sort.ts";
import { twoSum } from "../typescript/two-sum.ts";
import { isAnagram } from "../typescript/valid-anagram.ts";
import { isValid } from "../typescript/valid-parentheses.ts";

let seed = 7;
const rand = (lo: number, hi: number): number => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return lo + (seed % (hi - lo + 1));
};
const arr = (n: number, lo: number, hi: number): number[] => Array.from({ length: n }, () => rand(lo, hi));
const sortedNums = (a: number[]): number[] => [...a].sort((x, y) => x - y);

function validOrder(n: number, pre: number[][], order: number[]): boolean {
  if (JSON.stringify(sortedNums(order)) !== JSON.stringify([...Array(n).keys()])) return false;
  const pos = new Map(order.map((c, i) => [c, i]));
  return pre.every(([course, before]) => pos.get(before)! < pos.get(course)!);
}

// Two sum
assert.deepEqual(sortedNums(twoSum([2, 7, 11, 15], 9)), [0, 1]);
for (let t = 0; t < 200; t++) {
  const nums = arr(rand(2, 12), -20, 20);
  const i = rand(0, nums.length - 1);
  let j = rand(0, nums.length - 1);
  if (j === i) j = (i + 1) % nums.length;
  const [a, b] = twoSum(nums, nums[i] + nums[j]);
  assert.ok(a !== b && nums[a] + nums[b] === nums[i] + nums[j]);
}

// Three sum
const norm = (r: number[][]) => r.map((x) => sortedNums(x).join(",")).sort();
assert.deepEqual(norm(threeSum([-1, 0, 1, 2, -1, -4])), ["-1,-1,2", "-1,0,1"]);
for (let t = 0; t < 200; t++) {
  const nums = arr(rand(0, 10), -6, 6);
  const brute = new Set<string>();
  for (let a = 0; a < nums.length; a++)
    for (let b = a + 1; b < nums.length; b++)
      for (let c = b + 1; c < nums.length; c++)
        if (nums[a] + nums[b] + nums[c] === 0) brute.add(sortedNums([nums[a], nums[b], nums[c]]).join(","));
  const got = norm(threeSum(nums));
  assert.equal(new Set(got).size, got.length);
  assert.deepEqual(got, [...brute].sort());
}

// Valid parentheses
for (const [s, ok] of [["()", true], ["()[]{}", true], ["(]", false], ["([)]", false], ["{[]}", true], ["", true], ["(", false], [")", false]] as [string, boolean][])
  assert.equal(isValid(s), ok, s);

// Binary search
for (let t = 0; t < 300; t++) {
  const nums = [...new Set(arr(rand(0, 15), -50, 50))].sort((a, b) => a - b);
  const target = rand(-55, 55);
  assert.equal(binarySearch(nums, target), nums.indexOf(target));
}

// Reverse a linked list
for (const rev of [reverseList, reverseListRecursive]) {
  for (let n = 0; n < 6; n++) {
    let head: ListNode | null = null;
    for (let v = n - 1; v >= 0; v--) head = new ListNode(v, head);
    const out: number[] = [];
    for (let node = rev(head); node; node = node.next) out.push(node.val);
    assert.deepEqual(out, [...Array(n).keys()].reverse());
  }
}

// Merge intervals
assert.deepEqual(mergeIntervals([[1, 3], [2, 6], [8, 10], [15, 18]]), [[1, 6], [8, 10], [15, 18]]);
assert.deepEqual(mergeIntervals([[1, 4], [4, 5]]), [[1, 5]]);
assert.deepEqual(mergeIntervals([]), []);

// Longest palindromic substring
for (let t = 0; t < 200; t++) {
  const s = Array.from({ length: rand(1, 12) }, () => "ab"[rand(0, 1)]).join("");
  let best = 0;
  for (let i = 0; i < s.length; i++)
    for (let j = i + 1; j <= s.length; j++) {
      const sub = s.slice(i, j);
      if (sub === [...sub].reverse().join("")) best = Math.max(best, sub.length);
    }
  const got = longestPalindrome(s);
  assert.ok(got === [...got].reverse().join("") && s.includes(got) && got.length === best);
}

// LRU cache
{
  const c = new LRUCache(2);
  c.put(1, 1); c.put(2, 2);
  assert.equal(c.get(1), 1);
  c.put(3, 3);
  assert.equal(c.get(2), -1);
  c.put(4, 4);
  assert.equal(c.get(1), -1); assert.equal(c.get(3), 3); assert.equal(c.get(4), 4);
}

// Topological sort and course schedule
assert.ok(validOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]], courseOrder(4, [[1, 0], [2, 0], [3, 1], [3, 2]])));
assert.deepEqual(courseOrder(2, [[0, 1], [1, 0]]), []);
assert.deepEqual(courseOrderDfs(2, [[0, 1], [1, 0]]), []);
for (let t = 0; t < 300; t++) {
  const n = rand(1, 7);
  const pre: number[][] = [];
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) if (a !== b && rand(0, 9) < 2) pre.push([a, b]);
  const order = courseOrder(n, pre);
  const cyc = order.length === 0;
  assert.equal(canFinish(n, pre), !cyc);
  if (!cyc) { assert.ok(validOrder(n, pre, order)); assert.ok(validOrder(n, pre, courseOrderDfs(n, pre))); }
  else assert.deepEqual(courseOrderDfs(n, pre), []);
}

// Heapify and heap sort
for (let t = 0; t < 200; t++) {
  const a = arr(rand(0, 20), -30, 30);
  const h = [...a];
  buildMaxHeap(h);
  for (let i = 0; i < h.length; i++) for (const c of [2 * i + 1, 2 * i + 2]) if (c < h.length) assert.ok(h[i] >= h[c]);
  const s = [...a];
  heapSort(s);
  assert.deepEqual(s, sortedNums(a));
}

// Anagrams
assert.ok(isAnagram("anagram", "nagaram") && !isAnagram("rat", "car") && !isAnagram("a", "ab"));
assert.deepEqual(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]).map((g) => [...g].sort().join(",")).sort(), ["ate,eat,tea", "bat", "nat,tan"]);

// Maximum subarray
for (let t = 0; t < 300; t++) {
  const nums = arr(rand(1, 12), -10, 10);
  let best = -Infinity;
  for (let i = 0; i < nums.length; i++) { let s = 0; for (let j = i; j < nums.length; j++) { s += nums[j]; best = Math.max(best, s); } }
  assert.equal(maxSubArray(nums), best);
}

// Climbing stairs
{ let a = 1, b = 1; for (let n = 1; n < 40; n++) { assert.equal(climbStairs(n), b); [a, b] = [b, a + b]; } }

// Number of islands
assert.equal(numIslands([[..."11000"], [..."11000"], [..."00100"], [..."00011"]]), 3);

// Longest substring without repeating characters
for (let t = 0; t < 300; t++) {
  const s = Array.from({ length: rand(0, 12) }, () => "abcd"[rand(0, 3)]).join("");
  let best = 0;
  for (let i = 0; i < s.length; i++) for (let j = i + 1; j <= s.length; j++) if (new Set(s.slice(i, j)).size === j - i) best = Math.max(best, j - i);
  assert.equal(lengthOfLongestSubstring(s), best);
}

// Product of array except self
for (let t = 0; t < 300; t++) {
  const nums = arr(rand(2, 8), -3, 3);
  const brute = nums.map((_, i) => nums.reduce((p, v, j) => (j === i ? p : p * v), 1));
  assert.deepEqual(productExceptSelf(nums).map((x) => x + 0), brute.map((x) => x + 0));
}

// Coin change
assert.equal(coinChange([1, 2, 5], 11), 3);
assert.equal(coinChange([2], 3), -1);
assert.equal(coinChange([1], 0), 0);
assert.equal(coinChange([1, 3, 4], 6), 2);

// Kth largest element
for (let t = 0; t < 300; t++) {
  const nums = arr(rand(1, 15), -20, 20);
  const k = rand(1, nums.length);
  assert.equal(findKthLargest([...nums], k), [...nums].sort((a, b) => b - a)[k - 1]);
}

console.log("All TypeScript solutions passed.");

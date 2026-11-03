import heapq
import random


def find_kth_largest(nums: list[int], k: int) -> int:
    heap: list[int] = []  # min-heap of the k largest seen so far
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)  # drop the smallest
    return heap[0]


def find_kth_largest_quickselect(nums: list[int], k: int) -> int:
    target = len(nums) - k  # index of the answer in sorted order
    arr = nums[:]
    lo, hi = 0, len(arr) - 1
    while True:
        pivot = arr[random.randint(lo, hi)]
        less = [x for x in arr[lo:hi + 1] if x < pivot]
        equal = [x for x in arr[lo:hi + 1] if x == pivot]
        more = [x for x in arr[lo:hi + 1] if x > pivot]
        arr[lo:hi + 1] = less + equal + more
        if target < lo + len(less):
            hi = lo + len(less) - 1
        elif target < lo + len(less) + len(equal):
            return pivot
        else:
            lo = lo + len(less) + len(equal)

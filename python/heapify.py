def sift_down(a: list[int], i: int, size: int) -> None:
    """Move a[i] down until both children are smaller (max heap)."""
    while True:
        largest = i
        left, right = 2 * i + 1, 2 * i + 2
        if left < size and a[left] > a[largest]:
            largest = left
        if right < size and a[right] > a[largest]:
            largest = right
        if largest == i:
            return
        a[i], a[largest] = a[largest], a[i]
        i = largest


def build_max_heap(a: list[int]) -> None:
    """Heapify in place in O(n): sift down every parent, last parent first."""
    for i in range(len(a) // 2 - 1, -1, -1):
        sift_down(a, i, len(a))


def heap_sort(a: list[int]) -> None:
    build_max_heap(a)
    for end in range(len(a) - 1, 0, -1):
        a[0], a[end] = a[end], a[0]   # move the max to its final place
        sift_down(a, 0, end)


import heapq

nums = [3, 9, 2, 1, 4, 5]
heap = [-n for n in nums]   # heapq is a min-heap, so store negatives
heapq.heapify(heap)         # O(n)
largest = -heap[0]          # 9

def max_subarray(nums: list[int]) -> int:
    best = current = nums[0]
    for num in nums[1:]:
        # Either extend the run ending here, or start a new run at num.
        current = max(num, current + num)
        best = max(best, current)
    return best

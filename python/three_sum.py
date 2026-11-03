def three_sum(nums: list[int]) -> list[list[int]]:
    nums = sorted(nums)
    result: list[list[int]] = []
    for i in range(len(nums) - 2):
        if nums[i] > 0:
            break  # the smallest number is positive, so no sum can reach 0
        if i > 0 and nums[i] == nums[i - 1]:
            continue  # skip duplicate first numbers
        lo, hi = i + 1, len(nums) - 1
        while lo < hi:
            total = nums[i] + nums[lo] + nums[hi]
            if total < 0:
                lo += 1
            elif total > 0:
                hi -= 1
            else:
                result.append([nums[i], nums[lo], nums[hi]])
                lo += 1
                hi -= 1
                while lo < hi and nums[lo] == nums[lo - 1]:
                    lo += 1
    return result

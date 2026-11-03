def product_except_self(nums: list[int]) -> list[int]:
    n = len(nums)
    result = [1] * n
    prefix = 1
    for i in range(n):  # result[i] = product of everything left of i
        result[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):  # multiply in everything right of i
        result[i] *= suffix
        suffix *= nums[i]
    return result

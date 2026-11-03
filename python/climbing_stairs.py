def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    one_back, two_back = 2, 1  # ways to reach step 2 and step 1
    for _ in range(3, n + 1):
        one_back, two_back = one_back + two_back, one_back
    return one_back

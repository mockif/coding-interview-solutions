function maxSubArray(nums: number[]): number {
  let best = nums[0];
  let current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    // Either extend the run ending here, or start a new run at nums[i].
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

export { maxSubArray };

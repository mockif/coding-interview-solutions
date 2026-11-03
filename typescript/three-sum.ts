function threeSum(input: number[]): number[][] {
  const nums = [...input].sort((a, b) => a - b);
  const result: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] > 0) break; // the smallest number is positive, so no sum can reach 0
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate first numbers
    let lo = i + 1;
    let hi = nums.length - 1;
    while (lo < hi) {
      const total = nums[i] + nums[lo] + nums[hi];
      if (total < 0) lo++;
      else if (total > 0) hi--;
      else {
        result.push([nums[i], nums[lo], nums[hi]]);
        lo++;
        hi--;
        while (lo < hi && nums[lo] === nums[lo - 1]) lo++;
      }
    }
  }
  return result;
}

export { threeSum };

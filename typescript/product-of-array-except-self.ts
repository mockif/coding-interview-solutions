function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const result = new Array<number>(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) { // result[i] = product of everything left of i
    result[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) { // multiply in everything right of i
    result[i] *= suffix;
    suffix *= nums[i];
  }
  return result;
}

export { productExceptSelf };

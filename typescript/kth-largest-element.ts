// TypeScript has no built-in heap, so this is a small min-heap.
class MinHeap {
  private data: number[] = [];
  get size(): number { return this.data.length; }
  peek(): number { return this.data[0]; }
  push(value: number): void {
    const d = this.data;
    d.push(value);
    let i = d.length - 1;
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (d[parent] <= d[i]) break;
      [d[parent], d[i]] = [d[i], d[parent]];
      i = parent;
    }
  }
  pop(): number {
    const d = this.data;
    const top = d[0];
    const last = d.pop()!;
    if (d.length > 0) {
      d[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1;
        const r = l + 1;
        let smallest = i;
        if (l < d.length && d[l] < d[smallest]) smallest = l;
        if (r < d.length && d[r] < d[smallest]) smallest = r;
        if (smallest === i) break;
        [d[smallest], d[i]] = [d[i], d[smallest]];
        i = smallest;
      }
    }
    return top;
  }
}

function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap(); // the k largest seen so far
  for (const num of nums) {
    heap.push(num);
    if (heap.size > k) heap.pop(); // drop the smallest
  }
  return heap.peek();
}

export { MinHeap, findKthLargest };

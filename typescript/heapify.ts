// Move a[i] down until both children are smaller (max heap).
function siftDown(a: number[], i: number, size: number): void {
  while (true) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    if (left < size && a[left] > a[largest]) largest = left;
    if (right < size && a[right] > a[largest]) largest = right;
    if (largest === i) return;
    [a[i], a[largest]] = [a[largest], a[i]];
    i = largest;
  }
}

// Heapify in place in O(n): sift down every parent, last parent first.
function buildMaxHeap(a: number[]): void {
  for (let i = Math.floor(a.length / 2) - 1; i >= 0; i--) siftDown(a, i, a.length);
}

function heapSort(a: number[]): void {
  buildMaxHeap(a);
  for (let end = a.length - 1; end > 0; end--) {
    [a[0], a[end]] = [a[end], a[0]]; // move the max to its final place
    siftDown(a, 0, end);
  }
}

export { siftDown, buildMaxHeap, heapSort };

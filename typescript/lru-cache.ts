class LRUCache {
  private items = new Map<number, number>();
  private capacity: number;

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    if (!this.items.has(key)) return -1;
    const value = this.items.get(key)!;
    this.items.delete(key); // re-insert so it becomes the most recently used
    this.items.set(key, value);
    return value;
  }

  put(key: number, value: number): void {
    this.items.delete(key);
    this.items.set(key, value);
    if (this.items.size > this.capacity) {
      // A Map iterates in insertion order, so the first key is the least recently used.
      const lru = this.items.keys().next().value as number;
      this.items.delete(lru);
    }
  }
}

export { LRUCache };

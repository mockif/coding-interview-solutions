from collections import OrderedDict


class LRUCache:
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.items: OrderedDict[int, int] = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.items:
            return -1
        self.items.move_to_end(key)          # now the most recently used
        return self.items[key]

    def put(self, key: int, value: int) -> None:
        if key in self.items:
            self.items.move_to_end(key)
        self.items[key] = value
        if len(self.items) > self.capacity:
            self.items.popitem(last=False)   # evict the least recently used


class Node:
    def __init__(self, key: int = 0, value: int = 0) -> None:
        self.key, self.value = key, value
        self.prev: "Node | None" = None
        self.next: "Node | None" = None


class LRUCacheManual:
    """Hash map + doubly linked list, for when the interviewer says 'no OrderedDict'."""

    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.nodes: dict[int, Node] = {}
        self.head, self.tail = Node(), Node()   # sentinels: head.next is the LRU item
        self.head.next, self.tail.prev = self.tail, self.head

    def _unlink(self, node: Node) -> None:
        node.prev.next, node.next.prev = node.next, node.prev

    def _append(self, node: Node) -> None:      # insert just before tail (most recent)
        node.prev, node.next = self.tail.prev, self.tail
        self.tail.prev.next = node
        self.tail.prev = node

    def get(self, key: int) -> int:
        node = self.nodes.get(key)
        if node is None:
            return -1
        self._unlink(node)
        self._append(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.nodes:
            self._unlink(self.nodes[key])
        node = Node(key, value)
        self.nodes[key] = node
        self._append(node)
        if len(self.nodes) > self.capacity:
            lru = self.head.next
            self._unlink(lru)
            del self.nodes[lru.key]

from collections import deque


def course_order(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    """Kahn's algorithm. [a, b] means 'take b before a'. Returns [] if there is a cycle."""
    graph: list[list[int]] = [[] for _ in range(num_courses)]
    indegree = [0] * num_courses
    for course, before in prerequisites:
        graph[before].append(course)
        indegree[course] += 1

    queue = deque(c for c in range(num_courses) if indegree[c] == 0)
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for nxt in graph[node]:
            indegree[nxt] -= 1
            if indegree[nxt] == 0:
                queue.append(nxt)
    return order if len(order) == num_courses else []


def course_order_dfs(num_courses: int, prerequisites: list[list[int]]) -> list[int]:
    """DFS with three colours: 0 unvisited, 1 on the current path, 2 done."""
    graph: list[list[int]] = [[] for _ in range(num_courses)]
    for course, before in prerequisites:
        graph[before].append(course)

    state = [0] * num_courses
    post_order: list[int] = []

    def visit(node: int) -> bool:
        if state[node] == 1:
            return False              # back edge: a cycle
        if state[node] == 2:
            return True
        state[node] = 1
        for nxt in graph[node]:
            if not visit(nxt):
                return False
        state[node] = 2
        post_order.append(node)       # added after everything that depends on it
        return True

    for c in range(num_courses):
        if not visit(c):
            return []
    return post_order[::-1]

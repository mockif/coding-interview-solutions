def can_finish(num_courses: int, prerequisites: list[list[int]]) -> bool:
    graph: list[list[int]] = [[] for _ in range(num_courses)]
    for course, before in prerequisites:
        graph[before].append(course)  # edge: before -> course
    UNSEEN, VISITING, DONE = 0, 1, 2
    state = [UNSEEN] * num_courses

    def has_cycle(node: int) -> bool:
        state[node] = VISITING
        for nxt in graph[node]:
            if state[nxt] == VISITING:
                return True  # back edge: a loop of prerequisites
            if state[nxt] == UNSEEN and has_cycle(nxt):
                return True
        state[node] = DONE
        return False

    return not any(state[c] == UNSEEN and has_cycle(c) for c in range(num_courses))

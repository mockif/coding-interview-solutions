// Kahn's algorithm. [a, b] means "take b before a". Returns [] if there is a cycle.
function courseOrder(numCourses: number, prerequisites: number[][]): number[] {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  const indegree = new Array<number>(numCourses).fill(0);
  for (const [course, before] of prerequisites) {
    graph[before].push(course);
    indegree[course]++;
  }

  const queue: number[] = [];
  for (let c = 0; c < numCourses; c++) if (indegree[c] === 0) queue.push(c);

  const order: number[] = [];
  for (let head = 0; head < queue.length; head++) { // index pointer instead of shift(): O(1)
    const node = queue[head];
    order.push(node);
    for (const next of graph[node]) {
      if (--indegree[next] === 0) queue.push(next);
    }
  }
  return order.length === numCourses ? order : [];
}

// DFS with three states: 0 unvisited, 1 on the current path, 2 done.
function courseOrderDfs(numCourses: number, prerequisites: number[][]): number[] {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, before] of prerequisites) graph[before].push(course);

  const state = new Array<number>(numCourses).fill(0);
  const postOrder: number[] = [];

  const visit = (node: number): boolean => {
    if (state[node] === 1) return false; // back edge: a cycle
    if (state[node] === 2) return true;
    state[node] = 1;
    for (const next of graph[node]) if (!visit(next)) return false;
    state[node] = 2;
    postOrder.push(node); // added after everything that depends on it
    return true;
  };

  for (let c = 0; c < numCourses; c++) if (!visit(c)) return [];
  return postOrder.reverse();
}

export { courseOrder, courseOrderDfs };

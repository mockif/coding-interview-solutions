function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [course, before] of prerequisites) graph[before].push(course); // before -> course
  const UNSEEN = 0, VISITING = 1, DONE = 2;
  const state = new Array<number>(numCourses).fill(UNSEEN);

  const hasCycle = (node: number): boolean => {
    state[node] = VISITING;
    for (const next of graph[node]) {
      if (state[next] === VISITING) return true; // back edge: a loop of prerequisites
      if (state[next] === UNSEEN && hasCycle(next)) return true;
    }
    state[node] = DONE;
    return false;
  };

  for (let c = 0; c < numCourses; c++) {
    if (state[c] === UNSEEN && hasCycle(c)) return false;
  }
  return true;
}

export { canFinish };

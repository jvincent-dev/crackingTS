function helper(set: Array<number> = [], result: Set<string> = new Set()): void {
  result.add(JSON.stringify(set));
  
  set.forEach((_, index) => {
    const subset: Array<number> = [...set.slice(0, index), ...set.slice(index + 1)];

    helper(subset, result);
  });
}

// power set - write a funciton that returns all subsets of a set
export default function powerSet(set: Array<number>): Array<Array<number>> {
  const result: Array<Array<number>> = [];
  const s: Set<string> = new Set();

  helper(set, s);

  s.forEach(subset => result.push(JSON.parse(subset)));

  return result;
}
// plan: add set into result > start removing indeces and passing set recursively > use json stringify and a set to prevent duplicates
// time: ??? space: n?

function solve(set: Array<number>, result: Array<Array<number>>, subsetLen: number = 0, subset: Array<number> = [], index: number = 0): void {
  if (subset.length === subsetLen) { // isValid()
    result.push([...subset]);
    return;
  }

  for (let i: number = index; i < set.length; i++) {
    subset.push(set[i]);

    solve(set, result, subsetLen, subset, i + 1); // solve for next index

    subset.pop(); // backtrack
  }
}

export function powerSetBacktracking(set: Array<number>): Array<Array<number>> {
  const result: Array<Array<number>> = [];

  for (let i: number = 0; i <= set.length; i++) {
    // subsetLen tracks which subset size we want to add. ex: [1, 2, 3]. 1 = [ [1], [2], [3] ], 2 = [ [1,2], [2,3], [1,3] ], etc...
    solve(set, result, i);
  }

  return result;
}

/** backtracking
 * choice: pick a number to add to the array
 * constraint: isValid operation
 * goal: get add subset to power set
 */
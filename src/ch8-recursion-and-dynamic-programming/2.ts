import ListNode from "../ch2-linked-lists/util/ListNode";
import Queue from "../ch3-stacks-and-queues/util/Queue";

// robot grid - a robot is sitting on the upper left in a r x c grid. Find a path for the robot to get to the bottom right while some cells are off limits
// time: O(rc) space: O(rc)
export default function robotGridDFS(grid: Array<Array<string>> = [[]], currR: number = 0, currC: number = 0): boolean {
  const isWithinBounds = currR >= 0 && currC >= 0 && currR < grid.length && currC < grid[0].length;

  if (!isWithinBounds || grid[currR][currC] === "*") {
    console.log("Out of bounds!", currR, currC);
    return false; // grid is empty OR bottom right is reached
  } else if (currR === grid.length - 1 && currC === grid[0].length - 1) {
    grid[currR][currC] = "x";
    console.log("FINISH REACHED!", currR, currC);
    return true;
  }

  grid[currR][currC] = "x"; // mark current cell as visited
  console.log("Recurse", currR, currC);

  let hasPath = false;
  const isRightClear = grid[currR][currC + 1] === " ";
  const isBottomClear = grid[currR + 1]?.[currC] === " ";
  const isTopClear = grid[currR - 1]?.[currC] === " ";
  const isLeftClear = grid[currR][currC - 1] === " ";

  if (!hasPath && isRightClear) {
    hasPath = robotGridDFS(grid, currR, currC + 1);
  }

  if (!hasPath && isBottomClear) {
    hasPath = robotGridDFS(grid, currR + 1, currC);
  }

  if (!hasPath && isTopClear) {
    hasPath = robotGridDFS(grid, currR - 1, currC);
  }

  if (!hasPath && isLeftClear) {
    hasPath = robotGridDFS(grid, currR, currC - 1);
  }

  return hasPath; // tracking hasPath stops the search if a path is found
}
// plan: depth call top right bottom left while checking if we haven't hit off limit cells > if current index === r - 1 and c - 1 > return > mark
// visited cells with an x
// edge cases: we cannot reach the bottom right; empty grid; out of bounds; starting point is off limits

// time: O(rc) space: O(rc)
export function robotGridBFS(grid: Array<Array<string>> = [[]], currR: number = 0, currC: number = 0): boolean {
  const isWithinBounds = currR >= 0 && currC >= 0 && currR < grid.length && currC < grid[0].length;

  if (!isWithinBounds) {
    return false;
  }

  const queue: Queue<Array<number>> = new Queue(); // track currR, currC neighbor index
  const startIndex: ListNode<Array<number>> = new ListNode([currR, currC]);

  if (grid[currR][currC] === " ") {
    queue.enqueue(startIndex);
  }

  while (!queue.isEmpty()) {
    const [row, col] = queue.dequeue().value;

    grid[row][col] = "x"; // set as visited

    // get neighbors
    if (grid[row][col + 1] === " ") {
      const neighbor: ListNode<Array<number>> = new ListNode([row, col + 1]);
      queue.enqueue(neighbor);
    } // right

    if (grid[row + 1]?.[col] === " ") {
      const neighbor: ListNode<Array<number>> = new ListNode([row + 1, col]);
      queue.enqueue(neighbor);
    } // bottom

    if (grid[row - 1]?.[col] === " ") {
      const neighbor: ListNode<Array<number>> = new ListNode([row - 1, col]);
      queue.enqueue(neighbor);
    } // top

    if (grid[row][col - 1] === " ") {
      const neighbor: ListNode<Array<number>> = new ListNode([row, col - 1]);
      queue.enqueue(neighbor);
    } // left
  }

  return grid[grid.length - 1][grid[0].length - 1] === "x";
}
// plan: init a queue with start index > dequeue > set as visited > add available right, bottom, top, and left indices to queue 
// > repeat until queue is empty

// test --
// const grid = [
//   [" ", " "],
//   ["*", " "],
//   [" ", " "],
//   [" ", "*"],
//   [" ", " "],
//   ["*", " "],
//   [" ", " "],
//   [" ", "*"],
//   [" ", " "],
//   [" ", "*"],
//   [" ", " "]
// ];
// [
//   [" ", " ", " "],
//   [" ", " ", "*"],
//   [" ", " ", " "]
// ];
// [[]];
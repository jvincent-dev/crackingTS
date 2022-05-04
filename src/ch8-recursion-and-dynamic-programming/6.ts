import Stack from "../ch3-stacks-and-queues/util/Stack";

const TOWER_NAMES = ["o", "b", "d"]; // ["origin", "buffer", "destination"];

export class TowersOfHaoi {
  towers: Array<Stack<number>>;

  constructor(discCount: number) {
    this.towers = new Array(3).fill(null).map(() => new Stack());

    for (let i: number = 0; i < discCount; i++) {
      this.towers[0].push(discCount - i);
    }
  }

  print() {
    this.towers.forEach((tower, index) => console.log(TOWER_NAMES[index], tower));
  }
}

function moveToTop(origin: Stack<number>, destination: Stack<number>): void {
  const originTopVal: number | undefined = origin.pop();

  if (originTopVal === undefined) {
    throw new Error ("Error: Origin is empty");
  } else if (!destination.isEmpty() && originTopVal > destination.peek()) {
    throw new Error("Error: destination has smaller val than origin's top val")
  }
  
  destination.push(originTopVal);
}

function helper(discCount: number, origin: Stack<number>, buffer: Stack<number>, destination: Stack<number>, t: any): void {
  if (discCount <= 0) {
    return;
  }

  helper(discCount - 1, origin, destination, buffer, t);

  moveToTop(origin, destination);
  t.print();
  console.log("\n")

  helper(discCount - 1, buffer, origin, destination, t);
}

// towers of Hanoi -  In the classic problem of the Towers of Hanoi, you have 3 towers and N disks of
// different sizes which can slide onto any tower. The puzzle starts with disks sorted in ascending order
// of size from top to bottom (i.e., each disk sits on top of an even larger one).You have the following
// constraints:
// (1) Only one disk can be moved at a time.
// (2) A disk is slid off the top of one tower onto another tower.
// (3) A disk cannot be placed on top of a smaller disk.
// Write a program to move the disks from the first tower to the last using stacks.
export default function solveTowersOfHanoi(n: number) {
  const t = new TowersOfHaoi(n);

  helper(n, t.towers[0], t.towers[1], t.towers[2], t);

  t.print();
}
/** Left subtree breakdown of [3,2,1], [], [] example
 * my understanding from memory and ./notes
 * 
 * solve(n - 1, origin, buffer, destination); // getting origin to buffer and alternate until n - 1 <= 0.
 * Ex: A) [3,2,1], [], [] (n=3: move orig to dest) > B) [3,2,1], [], [] (n=2: move orig to buff) > C) [3,2,1], [], [] (n=1: move orig to dest)
 * D) n=0: return; > J) n=0: return; // (left of n=1-right-subtree)
 * moveTop(origin, destination); // dest could also be the buff since they're swapping per call
 * Ex: E) [3,2,1], [], [] to [3,2], [], [1] (n=1: move orig to dest) > H) [3], [2], [1] (n=2: move from orig to buff) > K) [3], 
 * [2,1], [] (n=1-right-subtree: move dest to buff) > O) [3], [2,1], [] to [], [2,1], [3] (n=3: move orig to dest)
 * solve(n - 1, buffer, origin, destination); // getting buffer to destination
 * F) n=0: return; > G) n=1: return; // (pop from callstack) > L) n=0: return; // (right of n=1-right-subtree) M) n=1-right-subtree:
 * return // (pop from callstack) N) n=2: return; // (pop from callstack) P) Continue with root's right subtree with (buff, orig, dest) ...
 * Ex: I) [3], [2], [1] (n=1-right-subtree: move dest to buff)(orig, dest, buff (n=2) BECOMES dest, orig, buff (n=1-right-subtree))
 * 
 * ** order is kept ([orig], [buff], [dest] on each level)
 */

/**
 * plan
 * - manually: move values into last from first until next value is greater than last.peek() > look for buffer to place next largest > find min .peek()
 *   > move min .peek() into buffer until next value is greater than buffer.peek() > move next value from first to empty > repeat ??? (wrong)
 * cases (buffer is like temp)
 * - mid and last have smaller value then next value on first, how to know where to take from?, how to know which the buffer is?
 * time: O((2^n) - 1), space: O((2^n)-1) - (2^n) - 1 because there are 2 recursive subtrees making a tree
 */
// stack of boxes - you have a stack of n boxes with width(w), height(h), depth(d). The boxes
// cannot be rotated and can only be stacked on top of one another if each box in the stack is strictly
// larger than the box above it in width, height, and depth. Implement a method to compute the
// height of the tallest possible stack. The height of a stack is the sum of the heights of each box.

function isValidStack(stack: Array<Array<number>>, newBox: Array<number>): boolean {
  // compare stack.peek() with newBox. if dimentions of newBox > stack.peek(): return false; else: return true
  if (stack.length === 0) {
    return true;
  }

  const top = stack[stack.length - 1];

  for (let i = 0; i < top.length; i++) {
    if (top[i] >= newBox[i]) {
      return false;
    }
  }

  return true;
}

function buildBoxStacks(
  boxes: Array<Array<number>>,
  currentStack: Array<Array<number>>,
  possibleStacks: Array<Array<Array<number>>>,
  index: number = 0,
  areBoxesUsed: Array<boolean> = new Array(boxes.length).fill(false)
): void {
  const areAllBoxesUsed = areBoxesUsed.every(isBoxUsed => isBoxUsed);

  if (areAllBoxesUsed) { // base case
    possibleStacks.push(currentStack.map(box => [...box])); // make deep copy
    return;
  }

  const currentBox = boxes[index];

  if (!areBoxesUsed[index] && isValidStack(currentStack, currentBox)) {
    areBoxesUsed[index] = true;
    currentStack.push(currentBox);
    buildBoxStacks(boxes, currentStack, possibleStacks, (index + 1) % boxes.length, areBoxesUsed); // recurse helper
    areBoxesUsed[index] = false;
    currentStack.pop();
  }
}

export default function stackOfBoxes(boxes: Array<Array<number>>): number {
  const stackedBoxes: Array<Array<Array<number>>> = [];

  // loop through boxes here
  for (let i=0; i<boxes.length; i++) {
    buildBoxStacks(boxes, [], stackedBoxes, i);
  }

  let highestStackHeight = boxes.reduce((currentHeight, box) => Math.max(currentHeight, box[1]), 0);

  stackedBoxes.forEach(stack => {
    const stackHeight = stack.reduce((currentHeight, box) => currentHeight + box[1], 0);

    highestStackHeight = Math.max(highestStackHeight, stackHeight);
  });

  return highestStackHeight;
} // pick box > validate stack > repeat till no more boxes
/**
 * plan
 * - init height result = 0 > for each box: check if selected box is stackable > repeat until no more stackable boxes > backtrack the boxes stacked > 
 *   if no more boxes return max hight
 * - choice, constraints, goal
 * cases
 * - no highest stack, 
 * time: O(n!), space: O(???)
 */

/*
ex ([[w,h,d]]):
1)
[
  [12,23,45],
  [20,45,50],
  [37,53,95]
]
2)
[
  [38,45,25],
  [76,3,35]
]
*/
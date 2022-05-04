import { TreeNode } from "./util/BinarySearchTree";

function weaveSubsequences(firstSeq: Array<number>, secondSeq: Array<number>, prefix: Array<number>, result: Array<Array<number>>): void {
  if (firstSeq.length === 0 || secondSeq.length === 0) {
    result.push([...prefix, ...firstSeq, ...secondSeq]);
    return;
  }

  let leadingVal: number | undefined = firstSeq.shift(); // would be more efficient w linked lists

  if (leadingVal !== undefined) {
    prefix.push(leadingVal);
  }

  weaveSubsequences(firstSeq, secondSeq, prefix, result);

  // backtrack
  if (leadingVal !== undefined) {
    prefix.pop();
    firstSeq.unshift(leadingVal);
  }

  leadingVal = secondSeq.shift();

  if (leadingVal) {
    prefix.push(leadingVal)
  }

  weaveSubsequences(firstSeq, secondSeq, prefix, result);

  if (leadingVal !== undefined) {
    prefix.pop();
    secondSeq.unshift(leadingVal);
  }
}

// bst sequence - A binary search tree was created by traversing through an array from left to right
// and inserting each element. Given a binary search tree with distinct elements, print all possible
// arrays that could have led to this tree.
export default function getBSTSequences(root: TreeNode<number> | null): Array<Array<number>> {
  const result: Array<Array<number>> = [];

  if (!root) {
    return result;
  }

  const sequence: Array<number> = [root.value];
  const leftSeq: Array<Array<number>> = getBSTSequences(root.left); // O(log(n))
  const rightSeq: Array<Array<number>> = getBSTSequences(root.right); // O(log(n))

  // create sequences
  if (leftSeq.length === rightSeq.length && leftSeq.length === 0) {
    return [sequence];
  } else if (leftSeq.length === 0) {
    return rightSeq.map(rSeq => [...sequence, ...rSeq]); // O(n! * n) - rSeq ???
  } else if (rightSeq.length === 0) {
    return leftSeq.map(lSeq => [...sequence, ...lSeq]); // O(n! * n) - lSeq ???
  }

  for (const lSeq of leftSeq) {
    for (const rSeq of rightSeq) {
      weaveSubsequences(lSeq, rSeq, sequence, result); // O(n!)
    }
  }

  return result;
}

/**
 * plan (wrong)
 * - init an array and get the max length of the array to be > traverse through the tree adding left
 * cases
 * - swapping left and right children's insert order for each level
 * time: O(n!), space: O(n) - just extra space, not counting the result ???
 */

/**
 * new plan from memory of the solution: init results array and sequence array > get left and right subsequences recursively > 
 *  return result with no sequences if !root > if left and right sequences exist: weave the values within each other into the
 *  sequence array (weaving should add the generated sequences into the results array) > return the results.
 * Weaving: pass firstSeq, secondSeq, prefix, results > remove the leading value from firstSeq and add to the prefix > if first or
 *  second is empty: push the rest of the other into a clone of the prefix and add the sequence to the results > backtrack and do the
 *  same for the secondSeq
 */
import { TreeNode } from "./util/BinarySearchTree";

function hasPathSum(root: TreeNode<number> | null, targetSum: number): boolean {
  if (!root) {
    return false;
  }

  const remainingSum = targetSum - root.value;

  if (remainingSum === 0) {
    return true;
  }

  return hasPathSum(root.left, remainingSum) || hasPathSum(root.right, remainingSum);
};

// You are given a binary tree in which each node contains an integer value (which
// might be positive or negative). Design an algorithm to count the number of paths that sum to a
// given value. The path does not need to start or end at the root or a leaf, but it must go downwards
// (traveling only from parent nodes to child nodes).
export default function countPaths(root: TreeNode<number> | null, targetSum: number): number {
  if (!root) {
    return 0;
  }

  const subtreePathCounts = countPaths(root.left, targetSum) + countPaths(root.right, targetSum);

  if (hasPathSum(root, targetSum)) {
    return subtreePathCounts + 1;
  }

  return subtreePathCounts;
}

function getPathSums(root: TreeNode<number> | null, targetSum: number): number {
  if (!root) {
    return 0;
  }

  const newSum = targetSum - root.value;
  let pathSums = getPathSums(root.left, newSum) + getPathSums(root.right, newSum);

  // if target sum === 0 keep going
  if (newSum === 0) {
    pathSums++;
  }

  return pathSums;
}

// counts multiple paths starting from a specific root, example below
export function countPaths2(root: TreeNode<number> | null, targetSum: number): number {
  if (!root) {
    return 0;
  }

  const pathCount = getPathSums(root, targetSum); // get count of paths starting from this node
  const subtreePathCounts = countPaths2(root.left, targetSum) + countPaths2(root.right, targetSum);

  return subtreePathCounts + pathCount;
}
/**
 * plan
 * - deduct root.value from targetSum > if target sum === 0 return left and right call + 1
 */
/**
 * plan
 * - create a hasPathSum to check if path has sum > recursively check current node if there is a path that doesn't necessarily end at a leaf > if there
 *   is, add 1; else: return the subtree path counts
 * cases
 * - negative numbers, no path
 * time: O(n), space: O(n) - for the call stack ???
 */

/** Ex: is this 3 or 2? should the 5 path be counted twice?
 *              5
 *            /   \
 *           2     1
 *               /   \
 *              4    -1
 */
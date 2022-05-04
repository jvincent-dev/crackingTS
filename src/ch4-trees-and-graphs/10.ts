import { TreeNode } from "./util/BinarySearchTree";

function isTheSubtree(currentRoot: TreeNode<number> | null, currentSubRoot: TreeNode<number> | null): boolean {
  // checks if the rest of the nodes are ===
  if (currentRoot === null && currentRoot === currentSubRoot) {
    return true; // base case
  } else if (currentRoot === null || currentSubRoot === null || currentRoot.value !== currentSubRoot.value) {
    return false;
  }

  return isTheSubtree(currentRoot.left, currentSubRoot.left) && isTheSubtree(currentRoot.right, currentSubRoot.right);
}

// check subtree - Tl and T2 are two very large binary trees, with Tl much bigger than T2. Create an algorithm to determine if T2 is a subtree of Tl.
//  A tree T2 is a subtree of Tl if there exists a node n in Tl such that the subtree of n is identical to T2.
//  That is, if you cut off the tree at node n, the two trees would be identical.
export default function checkSubtree(t1: TreeNode<number> | null, t2: TreeNode<number>): boolean {
  if (!t1) {
    return false;
  } else if (isTheSubtree(t1, t2)) {
    return true;
  }

  return checkSubtree(t1.left, t2) || checkSubtree(t1.right, t2);
}
/**
 * plan
 * - if !root: return false; else: check if isTheSubtree(root, subRoot) > check if left or right is the subtree
 * - isTheSubtree: if both nodes are null: return true (the nodes past were ===) > check if root or subroot is null or the values are !== > match the
 *   rest of the subtree
 * cases
 * - has both children, has only one child
 * time: O(n), space: O(logn) - the call stack ???
 */
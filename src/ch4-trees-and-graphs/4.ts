import BST, { TreeNode } from "./util/BinarySearchTree";

function getTreeDepth(root: TreeNode<number> | null): number {
  if (!root) {
    return 0;
  }

  return Math.max(getTreeDepth(root.left), getTreeDepth(root.right)) + 1;
}

function helper(root: TreeNode<number> | null): boolean {
  if (!root) {
    return true;
  }

  const leftDepth: number = getTreeDepth(root.left);
  const rightDepth: number = getTreeDepth(root.right);

  if (Math.abs(leftDepth - rightDepth) > 1) {
    return false;
  }

  return helper(root.left) && helper(root.right);
}

// check balanced - check if a binary tree is balanced (doesn't have to be a BST, just convenience)
export default function isBalanced(tree: BST<number>): boolean {
  return helper(tree.root);
}

// plan - check get left and right subtree depths and check difference > if (diff > 1): return false; else: recurse
// time: O(n2) - helper() is O(n) and for each recursion getTreeDepth() is O(n). So O(n2) ???, space: O(n2) - because or call stack ???

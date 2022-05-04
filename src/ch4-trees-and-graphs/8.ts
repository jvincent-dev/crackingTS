import BinaryTree from "./util/BinaryTree";
import { TreeNode } from "./util/BinarySearchTree";

function hasChild(currentNode: TreeNode<number> | null, node: TreeNode<number>): boolean {
  if (!currentNode) {
    return false;
  } else if (currentNode === node) {
    return true;
  }

  return hasChild(currentNode.left, node) || hasChild(currentNode.right, node);
}

function helper(currentNode: TreeNode<number> | null, treeNodeA: TreeNode<number>, treeNodeB: TreeNode<number>): TreeNode<number> | null {
  if (!currentNode) {
    return null;
  }

  const isCurrentParentA = currentNode.left === treeNodeA || currentNode.right === treeNodeA;
  const isCurrentParentB = currentNode.left === treeNodeB || currentNode.right === treeNodeB;

  if (isCurrentParentA || isCurrentParentB) {
    return currentNode;
  }

  // look for parents in right or left
  const leftAncestor = helper(currentNode.left, treeNodeA, treeNodeB);
  const rightAncestor = helper(currentNode.right, treeNodeA, treeNodeB);

  if (leftAncestor === rightAncestor) {
    return leftAncestor;
  } else if (!leftAncestor) {
    return rightAncestor;
  } else if (!rightAncestor) {
    return leftAncestor;
  }

  return currentNode; // current is common cause left parent !== right parent
}

// first common ancestor - create a function to find the first common ancestor of two nodes in a binary tree. Avoid storing additional nodes in a DS
export default function firstCommonAncestor(
  tree: BinaryTree<number>,
  treeNodeA: TreeNode<number>,
  treeNodeB: TreeNode<number>
): TreeNode<number> | null {
  if (tree.root === treeNodeA || tree.root === treeNodeB) {
    return null; // root has no parent
  } else if (!hasChild(tree.root, treeNodeA)) {
    throw new Error("Node A is not in the tree");
  } else if (!hasChild(tree.root, treeNodeB)) {
    throw new Error("Node B is not in the tree");
  }

  const commonAncestor = helper(tree.root, treeNodeA, treeNodeB);

  return commonAncestor;
}

/** ex: 2, 4 = 1; 4, 7 = 1, 4, 5 = 2
 *        1
 *       /  \
 *     2     3
 *    / \   / \
 *   4   5 6   7
 */

/** 98m
 * plan
 * - look for treeNodeA or treeNodeB > if either is found: check the left or right subtree of the current parent > if current node has 2nd child too:
 *   return current node as parent (scratch)
 * - look for parent node of nodes A and B on left subtree and right subtree > if found return parent node > compare found parent nodes on subtrees >
 *   if not the same: return current node; else: return parent nodes from subtrees... fixed handling null parents... and nodes that are not in tree
 * cases
 * - no common ancestor, one of the nodes is the root, comparing subtree parent with null, node provided is not in tree
 * time: O(n) - hasChild() and helper(), space: O(logn) - height of tree for recursive stack call
 */
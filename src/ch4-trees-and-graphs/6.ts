import { isLeaf, TreeNode } from "./util/BinarySearchTree";

// successor - find the "next" node (ie: in order successor) of a given node in a BST
export default function successor(node: TreeNode<number>, currentNode: TreeNode<number> = node): TreeNode<number> | null {
  if (isLeaf(currentNode)) {
    if (node === currentNode) {
      return null; // not found
    } else {
      return currentNode; // found
    }
  } else if (currentNode.left) {
    currentNode = currentNode.left;
    
    while (currentNode.right) { // go deep right
      currentNode = currentNode.right;
    }
  } else if (currentNode.right) {
    currentNode = currentNode.right;
    
    while (currentNode.left) { // go deep left
      currentNode = currentNode.left;
    }
  }

  return currentNode;
}

/**
 * plan
 * - look for left's right most node or right's left most node
 * cases
 * - no left or right: null?, only left, only right
 * 
 * time: O(n), space: O(n) - depth
 */

/** 20 = 16, 15 = 9, 21 = null
 *         20
 *        /  \
 *      15    21
 *     /  \     \
 *    9   16    30
 */
import { TreeNode } from "./util/BinarySearchTree";

// validate BST - make sure bst is valid
// plan: traverse through tree while checking if current node is a valid placement; if not return false > if leaf is reached return true
export default function validateBST(root: TreeNode<number> | null): boolean {
  if (!root) {
    return true;
  } else if (root.left && root.left.value > root.value) {
    return false;
  } else if (root.right && root.right.value <= root.value) {
    return false;
  }
  
  // check if valid placement
  const isLeftSubtreeBST = validateBST(root.left);
  const isRightSubtreeBST = validateBST(root.right);

  return isLeftSubtreeBST && isRightSubtreeBST;
}
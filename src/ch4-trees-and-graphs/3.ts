import ListNode from "../ch2-linked-lists/util/ListNode";
import BST, { TreeNode } from "./util/BinarySearchTree";

// list of depth - given a binary tree, design an algrorithm that creates a linked list of all nodes at each depth
function createListOfDepth(root: TreeNode<number> | null, result: Array<ListNode<number>> = [], currentDepth: number = 0): void {
  if (!root) {
    return;
  }

  createListOfDepth(root.left, result, currentDepth + 1);
  createListOfDepth(root.right, result, currentDepth + 1);

  const newListNode: ListNode<number> = new ListNode(root.value);

  // create a new list node > if current index === undefined: set to current index; else: add to end of first node of current index
  if (result[currentDepth] === undefined) {
    result[currentDepth] = newListNode;
  } else {
    let currentNode: ListNode<number> = result[currentDepth];

    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    currentNode.next = newListNode;
  }
}

export default function listOfDepth(tree: BST<number>) {
  const result: Array<ListNode<number>> = [];

  createListOfDepth(tree.root, result);

  return result;
}

/**
 * plan: create an array of results with length Depth > traverse through tree and for each depth add to list on index 
 * edge cases: one sided tree
 */
import ListNode from "../../ch2-linked-lists/util/ListNode";
import Queue from "../../ch3-stacks-and-queues/util/Queue";
import { TreeNode } from "./BinarySearchTree";

export default class BinaryTree<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  isEmpty(): boolean {
    return !this.root;
  }

  insert(newNode: TreeNode<T>): void {
    if (!this.root) {
      this.root = newNode;
      return;
    }

    const treeLevelQueue: Queue<TreeNode<T>> = new Queue();
    let treeNode: TreeNode<T> = this.root;

    if (treeNode.left) {
      treeLevelQueue.enqueue(new ListNode(treeNode.left));
    }

    if (treeNode.right) {
      treeLevelQueue.enqueue(new ListNode(treeNode.right));
    }

    // find spot to insert node level by level
    while (treeNode.left && treeNode.right) {
      treeNode = treeLevelQueue.dequeue().value;

      if (treeNode.left) {
        treeLevelQueue.enqueue(new ListNode(treeNode.left));
      }

      if (treeNode.right) {
        treeLevelQueue.enqueue(new ListNode(treeNode.right));
      }
    }

    if (!treeNode.left) {
      treeNode.left = newNode;
    } else if (!treeNode.right) {
      treeNode.right = newNode;
    }
  }

  // plan: find last node and deleted node > swap the deleted node value with the last node > delete the last node
  delete(value: T): TreeNode<T> | null {
    const deletedNode: TreeNode<T> | null = this.find(value);

    if (!deletedNode || !this.root) {
      return null;
    } else if (!this.root.left && !this.root.right) {
      // is last tree node
      const result = this.root;

      this.root = null;

      return result;
    }

    // find last node
    const nodesQueue: Queue<TreeNode<T>> = new Queue();
    let currentNode: TreeNode<T> = this.root;

    while (currentNode.left || currentNode.right) {
      if (currentNode.left) {
        nodesQueue.enqueue(new ListNode(currentNode.left));
      }

      if (currentNode.right) {
        nodesQueue.enqueue(new ListNode(currentNode.right));
      }

      currentNode = nodesQueue.dequeue().value;
    }

    // swap
    const lastNode = currentNode;
    const tempValue = lastNode.value;

    lastNode.value = deletedNode.value;
    deletedNode.value = tempValue;

    while (!nodesQueue.isEmpty()) {
      nodesQueue.dequeue();
    } // clear queue to reuse

    // delete last node
    currentNode = this.root;

    while (currentNode.left !== lastNode && currentNode.right !== lastNode) {
      if (currentNode.left) {
        nodesQueue.enqueue(new ListNode(currentNode.left));
      }

      if (currentNode.right) {
        nodesQueue.enqueue(new ListNode(currentNode.right));
      }

      currentNode = nodesQueue.dequeue().value;
    }

    if (currentNode.left === lastNode) {
      currentNode.left = null;
    } else if (currentNode.right === lastNode) {
      currentNode.right = null;
    }

    return lastNode;
  }

  findPreOrder(value: T, currentNode: TreeNode<T> | null = this.root): TreeNode<T> | null {
    if (!currentNode) {
      return null;
    } else if (value === currentNode.value) {
      return currentNode;
    }

    return this.findPreOrder(value, currentNode.left) || this.findPreOrder(value, currentNode.right);
  }

  find(value: T): TreeNode<T> | null {
    return this.findPreOrder(value);
  }

  printPreOrder(currentNode: TreeNode<T> | null = this.root): void {
    if (!currentNode) {
      return;
    }

    console.log(currentNode.value);
    this.printPreOrder(currentNode.left);
    this.printPreOrder(currentNode.right);
  }

  print(): void {
    if (this.isEmpty()) {
      console.log("Binary Tree Is Empty");
    } else {
      this.printPreOrder();
    }
  }
}

// more efficent: https://medium.com/data-structure-and-algorithms/binary-tree-insert-in-o-1-time-delete-and-search-aba97f9d5156
export class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  isLeaf(): boolean {
    return this.left === this.right && this.left === null;
  }
}

export function isLeaf(node: TreeNode<number>): boolean {
  return !node.left && !node.right;
}

export default class BST<T> {
  root: TreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(value: T, currentRoot: TreeNode<T> | null = this.root): TreeNode<T> {
    if (this.find(value) !== null) {
      throw new Error("Input already exists.");
    }

    const newNode: TreeNode<T> = new TreeNode(value);

    if (!currentRoot) {
      this.root = newNode;
    } else if (value <= currentRoot.value) { // will check left
      if (currentRoot.left) {
        this.insert(value, currentRoot.left);
      } else {
        currentRoot.left = newNode;
      }
    } else if (value > currentRoot.value) { // will check right
      if (currentRoot.right) {
        this.insert(value, currentRoot.right);
      } else {
        currentRoot.right = newNode;
      }
    }

    return newNode;
  }

  private getLeftSuccessorNode(currentRoot: TreeNode<T>): TreeNode<T> {
    if (currentRoot.right) {
      return this.getLeftSuccessorNode(currentRoot.right);
    }

    return currentRoot;
  }

  private removeNode(input: T, currentRoot: TreeNode<T> | null): TreeNode<T> | null {
    if (!currentRoot) {
      return null;
    } else if (input < currentRoot.value) { // search left subtree
      currentRoot.left = this.removeNode(input, currentRoot.left);
    } else if (input > currentRoot.value) { // search right subtree
      currentRoot.right = this.removeNode(input, currentRoot.right);
    } else { // node found
      if (currentRoot.isLeaf()) { // has no children
        return null;
      } else if (currentRoot.left === null) { // has only right child
        return currentRoot.right;
      } else if (currentRoot.right === null) { // has only left child
        return currentRoot.left;
      }

      // if has both children
      // get a successor from left subtree
      // replace deleted node's value with successor's value
      currentRoot.value = this.getLeftSuccessorNode(currentRoot.left).value;

      // delete successor duplicate under left subtree and return to be set in parent
      currentRoot.left = this.removeNode(currentRoot.value, currentRoot.left);
    }

    return currentRoot;
  }

  remove(input: T): void {
    this.root = this.removeNode(input, this.root);
  }

  find(input: T, currentRoot: TreeNode<T> | null = this.root): TreeNode<T> | null {
    if (currentRoot === null) {
      return null;
    }

    if (input < currentRoot.value) {
      return this.find(input, currentRoot.left);
    } else if (input > currentRoot.value) {
      return this.find(input, currentRoot.right);
    } else if (input === currentRoot.value) {
      return currentRoot;
    }

    return null;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  print(): void {
    console.log(this.root);
  }
}

/** inserted in this order: [16, 23, 19, 64, 9, 10]
 *      16        16          16          16                 16                16
 *                  \        / \         /  \               /  \              /   \
 *                   23         23           23            9   23            9     23
 *                             /             / \              /  \            \   /  \
 *                            19           19   64           19   64          10 19   64
 */
export class RandomTreeNode<T> {
  value: T;
  left: RandomTreeNode<T> | null;
  right: RandomTreeNode<T> | null;
  subtreeSize: number;

  constructor(value: T) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.subtreeSize = 1;
  }
}

export default class RandomBinarySearchTree<T> {
  root: RandomTreeNode<T> | null;

  constructor() {
    this.root = null;
  }

  insert(newNode: RandomTreeNode<T>, currentNode: RandomTreeNode<T> | null = this.root): void {
    if (!currentNode) {
      this.root = newNode;
    } else if (newNode.value > currentNode.value) {
      currentNode.subtreeSize++;

      if (currentNode.right) {
        this.insert(newNode, currentNode.right);
      } else {
        currentNode.right = newNode;
      }
    } else {
      currentNode.subtreeSize++;

      if (currentNode.left) {
        this.insert(newNode, currentNode.left);
      } else {
        currentNode.left = newNode;
      }
    }
  }

  remove(deleteVal: T, currentNode: RandomTreeNode<T> | null = this.root): RandomTreeNode<T> | null {
    // look for node > look for replacement node > set replacement node with 
    if (!currentNode) {
      return null;
    } else if (this.root && !this.root.left && !this.root.right) {
      this.root = null;
      return null;
    }

    currentNode.subtreeSize = currentNode.subtreeSize - 1;

    if (deleteVal < currentNode.value) {
      currentNode.left = this.remove(deleteVal, currentNode.left);
    } else if (deleteVal > currentNode.value) {
      currentNode.right = this.remove(deleteVal, currentNode.right);
    } else { // cases: replacement node has no children, only left child, only right child, has both
      if (!currentNode.left && !currentNode.right) { // no children
        return null;
      } else if (!currentNode.right) {
        if (currentNode === this.root) {
          this.root = currentNode.left;
        }

        return currentNode.left; // replace removed node with left
      } else if (!currentNode.left) {
        if (currentNode === this.root) {
          this.root = currentNode.right;
        }

        return currentNode.right; // replace removed node with right
      } else { // has both children
        let runnerNode = currentNode.left;

        runnerNode.subtreeSize = runnerNode.subtreeSize - 1; // update left's subtreeSize

        // cases: left has no right and has right
        if (!runnerNode.right) {
          currentNode.value = runnerNode.value; // replace current node val w successor node val
          currentNode.left = null; // delete old successor node
        } else if (runnerNode.right) {
          while (runnerNode.right?.right) {
            runnerNode.subtreeSize = runnerNode.subtreeSize - 1; // update level's subtreeSize
            runnerNode = runnerNode.right;
          }

          if (runnerNode.right) {
            currentNode.value = runnerNode.right.value;
            runnerNode.right = null; // delete old successor node
          } else { // I don't know why runnerNode.right could be null ...
            throw new Error("Error: replacing successor node");
          }
        }
      }
    }

    return currentNode;
  }

  private findRandomNode(currentNode: RandomTreeNode<T> | null = this.root): RandomTreeNode<T> | null {
    if (!currentNode) {
      return null;
    }

    const leftIndex = currentNode.left ? currentNode.left.subtreeSize : 0;
    const randIndex = Math.floor(Math.random() * currentNode.subtreeSize); // [0, n)

    if (randIndex < leftIndex) {
      return this.findRandomNode(currentNode.left);
    } else if (randIndex === leftIndex) {
      return currentNode;
    }

    return this.findRandomNode(currentNode.right);
  }

  // random node - implement a BST with a getRandomNode() function that returns a random node from the tree. Make sure each node is likely chosen
  getRandomNode(): RandomTreeNode<T> | null {
    return this.findRandomNode();
  }
}

/** inserted in this order: [16, 23, 19, 64, 9, 10]
 *      16        16          16          16                 16                16
 *                  \        / \         /  \               /  \              /   \
 *                   23         23           23            9   23            9     23
 *                             /             / \              /  \            \   /  \
 *                            19           19   64           19   64          10 19   64
 */
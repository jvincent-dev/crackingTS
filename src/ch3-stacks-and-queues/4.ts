import Stack from "./util/Stack";

// queue via stacks - implement a MyQueue class using two stacks
// time: enqueue O(1) dequeue O(n) space: enqueue O(1) dequeue O(1)
export default class MyQueue<T> {
  inStack: Stack<T>;
  outStack: Stack<T>;

  constructor() {
    this.inStack = new Stack();
    this.outStack = new Stack();
  }

  enqueue(value: T): void {
    this.inStack.push(value);
  }

  dequeue(): T | undefined {
    if (this.isEmpty()) {
      console.log("Queue is empty");
    }

    if (this.outStack.isEmpty()) {
      while (!this.inStack.isEmpty()) {
        const value: T | undefined = this.inStack.pop();

        if (value !== undefined) {
          this.outStack.push(value);
        }
      }
    }

    return this.outStack.pop();
  }

  size(): number {
    return this.inStack.size() + this.outStack.size();
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }
}

// plan: enqueue() - take value > push to in stack, dequeue() - if outStack is empty pop inStack values and push into outStack > pop value from outStack
// edge cases: alternate enqueue() and dequeue()
import Stack from "./util/Stack";

// min stack - implement a stack with push, pop and min in O(1) time
// time: push O(1) pop O(1) min O(1) space: push O(n) pop O(1) min O(1) 
export default class MinStack<T> {
  private stack: Stack<T>;
  private minStack: Stack<T>;

  constructor() {
    this.stack = new Stack();
    this.minStack = new Stack();
  }

  push(value: T): void {
    if (this.minStack.size() === 0 || value <= this.minStack.peek()) {
      this.minStack.push(value);
    }

    this.stack.push(value);
  }

  pop(): T | undefined {
    const poppedValue = this.stack.pop();

    if (poppedValue === this.minStack.peek()) {
      this.minStack.pop();
    }

    return poppedValue;
  }

  min(): T {
    return this.minStack.peek();
  }

  print(): void {
    this.stack.print();
    this.minStack.print();
  }
}

// plan: implement regular stack and have a min stack to track the min numbers
// edge cases: min number pushed before or after another min number, new min number with same value is pushed
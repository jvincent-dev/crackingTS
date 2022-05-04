import Stack from "./util/Stack";

// stack of plates - implement a stack that would break up stacks based on a treshold like a stack of plates
export default class StackOfPlates<T> {
  private stacks: Array<Stack<T>>;
  threshold: number;

  constructor(threshold: number) {
    this.stacks = [new Stack()];
    this.threshold = threshold;
  }

  push(value: T): void {
    const currentStack: Stack<T> = this.stacks[this.stacks.length - 1];

    if (currentStack.size() > this.threshold) {
      const newStack: Stack<T> = new Stack();

      newStack.push(value);
      this.stacks.push(newStack);
    } else {
      currentStack.push(value);
    }
  }

  pop(): T | undefined {
    const currentStack: Stack<T> = this.stacks[this.stacks.length - 1];
    const value: T | undefined = currentStack.pop();

    if (!this.isEmpty() && currentStack.size() === 0) {
      this.stacks.pop();
    }

    return value;
  }

  popAt(stackIndex: number): T | undefined {
    if (stackIndex > this.stacks.length - 1) {
      throw new Error(`Index out of bounds: ${stackIndex}`);
    }

    const stackAt: Stack<T> = this.stacks[stackIndex];
    const value: T | undefined = stackAt.pop();

    if (!this.isEmpty() && stackAt.size() === 0) { // remove current stack
      this.stacks.splice(stackIndex, 1);
    }

    return value;
  }

  isEmpty(): boolean {
    return this.stacks.length === 1 && this.stacks[0].isEmpty();
  }

  print(): void {
    this.stacks.forEach(stack => {
      stack.print();
    });

    console.log("threshold:", this.threshold);
  }
}

// plan: pushing checks threshold popping check threshold and removes
// edge cases: current stack is filled/is emptied, popAt() index is empty
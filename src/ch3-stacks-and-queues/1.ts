import Stack from "./util/Stack";

// tripple stack - describe how you would use an array to implement 3 stacks
// time: push O(1) pop O(1) peek O(1) size O(1) isEmpty O(1) size: push O(1) pop O(1) peek O(1) size O(1) isEmpty O(1)
export default class TrippleStack<T> {
  private stacks: Array<Stack<T>>;

  constructor() {
    this.stacks = [
      new Stack(),
      new Stack(),
      new Stack()
    ];
  }

  push(value: T, stackIndex: number): void {
    this.stacks[stackIndex].push(value);
  }

  pop(stackIndex: number): T | undefined {
    if (this.stacks[stackIndex].size() === 0) {
      console.log(`Stack ${stackIndex} is empty`);
    }

    return this.stacks[stackIndex].pop();
  }

  peek(stackIndex: number): T {
    return this.stacks[stackIndex].peek();
  }

  size(stackIndex: number): number {
    return this.stacks[stackIndex].size();
  }

  isEmpty(stackIndex: number): boolean {
    return this.stacks[stackIndex].isEmpty();
  }

  print(): void {
    console.log("[")
    this.stacks.forEach(stack => stack.print());
    console.log("]")
  }
}

// plan: init array with 3 stacks (which is also an array) > ask to specify which stack to push/pop elements from
// edge cases: selected stack is out of bounds
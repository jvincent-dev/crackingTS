export default class Stack<T> {
  private stack: Array<T>;

  constructor() {
    this.stack = [];
  }

  push(value: T): void {
    this.stack.push(value);
  }

  pop(): T | undefined {
    const value: T | undefined = this.stack.pop();

    if (value === undefined) {
      console.log("Stack is empty");
    }

    return value;
  }

  peek(): T {
    if (this.stack.length === 0) {
      console.log("Stack is empty");
    }

    return this.stack[this.stack.length - 1];
  }

  has(value: T): boolean {
    return this.stack.includes(value);
  }

  size(): number {
    return this.stack.length;
  }

  isEmpty(): boolean {
    return this.stack.length === 0;
  }

  print(): void {
    if (this.stack.length === 0) {
      return console.log("Stack is empty");
    }

    console.log("Stack:", this.stack.join(" "));
  }
}
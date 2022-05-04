import ListNode from "../../ch2-linked-lists/util/ListNode";

export default class Queue<T> {
  front: ListNode<T> | null;
  back: ListNode<T> | null;
  private len: number;

  constructor() {
    this.front = null;
    this.back = this.front;
    this.len = 0;
  }

  enqueue(newNode: ListNode<T>): void {
    if (!this.front || !this.back) {
      this.front = newNode;
      this.back = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode;
    }

    this.len++;
  }

  dequeue(): ListNode<T> {
    if (!this.front) {
      throw new Error("List is empty");
    }

    const removedNode = this.front;

    this.front = this.front.next;
    removedNode.next = null;
    this.len--;

    if (this.len === 0) {
      this.back = null;
    }

    return removedNode;
  }

  size(): number {
    return this.len;
  }

  isEmpty(): boolean {
    return this.len === 0;
  }

  print(): void {
    if (!this.front) {
      return console.log("Queue is empty");
    }

    const arr: Array<T> = [];
    let currentNode: ListNode<T> | null = this.front;

    while (currentNode) {
      arr.push(currentNode.value);
      currentNode = currentNode.next;
    }

    console.log("Queue Values:", arr.join(" "));
  }
}
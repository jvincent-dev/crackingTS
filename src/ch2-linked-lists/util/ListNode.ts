// my linked list solutions uses dummy nodes
export default class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export function createList(head: ListNode<number | string>, arr: Array<number | string>): void {
  let currentNode: ListNode<number | string> | null = head;

  for (let i=0; i<arr.length; i++) {
    const newNode = new ListNode(arr[i]);

    currentNode.next = newNode;
    currentNode = currentNode.next;
  }
}

export function insertValue(head: ListNode<number | string>, value: number | string): ListNode<number | string> {
  let currentNode: ListNode<number | string> = head;

  while (currentNode.next) {
    currentNode = currentNode.next;
  }

  currentNode.next = new ListNode(value);

  return currentNode.next;
}

export function printList(head: ListNode<number | string>): void {
  let currentNode: ListNode<number | string> | null = head.next;

  if (!currentNode) {
    return console.log("list is empty");
  }

  console.log("printing list");

  while (currentNode) {
    console.log(currentNode.value);
    currentNode = currentNode.next;
  }
}
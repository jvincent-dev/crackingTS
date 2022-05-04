import ListNode from "./util/ListNode";

// delete middle node (any node but the first or last)
// time: O(n) space: O(1)
export function deleteMiddleNode(head: ListNode<number | string>): void {
  if (!head.next) {
    throw new Error("List is empty");
  }

  let currentNode: ListNode<number | string> = head;
  let listLength: number = 0;

  while (currentNode.next) {
    currentNode = currentNode.next;
    listLength++;
  }

  const midIndex: number = Math.floor(listLength / 2);
  currentNode = head;

  for (let i: number = 0; i < midIndex; i++) {
    if (currentNode.next) {
      currentNode = currentNode.next;
    }
  }

  currentNode.next = currentNode.next?.next || null;
}

// space: O(1) time: O(1)
export default function deleteGivenMiddleNode(node: ListNode<number | string>): void {
  if (!node.next) {
    throw new Error("Not enough values");
  }

  node.value = node.next.value;
  node.next = node.next.next;
}

// plan: loop through the list once to get the length of the list > calculate for the half > loop through the list again up to (length / 2) - 1
//  > set next = next.next
// edge cases: length of 1, empty list
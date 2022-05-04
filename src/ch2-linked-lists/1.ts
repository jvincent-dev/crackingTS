import ListNode from "./util/ListNode";

// Remove Dups - remove duplicates from an unsorted linkedlist
// time: O(n2) space: O(1)
export default function removeDups(head: ListNode<number | string>): void {
  if (!head.next) {
    return; // not enough values
  }

  let currentNode: ListNode<number | string> | null = head.next;
  let runner: ListNode<number | string> | null = head.next;
  let temp: number | string = head.next.value;

  while (currentNode) {
    runner = currentNode;
    temp = runner.value;

    while (runner) {
      if (runner.next && temp === runner.next.value) {
        runner.next = runner.next.next;
      } else {
        runner = runner.next;
      }
    }

    currentNode = currentNode.next;
  }
}
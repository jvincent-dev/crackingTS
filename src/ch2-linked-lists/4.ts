import ListNode, { insertValue } from "./util/ListNode";

// partition - partition the list by value x
// time: O(n) space: O(n)
export default function partition(head: ListNode<number | string>, input: number | string): ListNode<number | string> {
  // plan: loop through the list > create a left and right linked list (left values are < input right values are >= input) > find last element of left
  //  part > set last element next = right part's start
  const leftPart: ListNode<number | string> = new ListNode(0);
  const rightPart: ListNode<number | string> = new ListNode(0);
  let leftTail: ListNode<number | string> = leftPart;
  let rightTail: ListNode<number | string> = rightPart;
  let currentNode: ListNode<number | string> | null = head.next;

  while (currentNode) {
    if (currentNode.value < input) { // insert into left part
      leftTail = insertValue(leftTail, currentNode.value);
    } else { // insert into right part
      rightTail = insertValue(rightTail, currentNode.value);
    }

    currentNode = currentNode.next;
  }

  currentNode = leftPart;

  while (currentNode?.next) {
    currentNode = currentNode.next;
  }

  currentNode.next = rightPart.next;

  return leftPart;
}
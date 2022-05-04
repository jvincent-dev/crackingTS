import ListNode from "./util/ListNode";

// palindrome - check if linked list is a palindrome
// time: O(n) space: O(n)
export default function isPalindromeStack(head: ListNode<number | string>): boolean {
  let currentNode: ListNode<number | string> | null = head.next;
  let precedingValues: Array<number | string> = [];
  let listLength = 0;

  // find midpoint
  while (currentNode) {
    currentNode = currentNode.next;
    listLength++;
  }

  const midpoint = Math.floor(listLength / 2);
  let index: number = 0;

  currentNode = head.next;

  while (currentNode) {
    if (index >= midpoint) {
      // start popping and comparing
      const isOddAndOnMidpoint = listLength % 2 !== 0 && index === midpoint;

      if (!isOddAndOnMidpoint && precedingValues.pop() !== currentNode.value) {
        return false;
      }
    } else {
      precedingValues.push(currentNode.value);
    }

    currentNode = currentNode.next;
    index++;
  }

  return true;
}

// plan: create stack > find midpoint > if (index > midpoint): start popping and comparing values > if values are != return false
// cases: odd, even length
// R: understand how isPalindromeReverse() is O(1) space (I just don't believe having a reverse is O(1) space) :shrug:
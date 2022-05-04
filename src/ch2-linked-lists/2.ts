import ListNode from "./util/ListNode";

const NOT_ENOUGH_VALUES_ERROR = new Error("Not enough values in the list");

// Return Kth to last value
// time: O(n) space: O(1)
export default function kthToLast(head: ListNode<number | string>, k: number): number | string {
  if (k < 0) {
    throw new Error("Index out of bounds");
  } else if (!head.next) {
    throw NOT_ENOUGH_VALUES_ERROR;
  }

  let headRunner: ListNode<number | string> = head.next;
  let tailRunner: ListNode<number | string> = head.next;
  let distance: number = 0;

  while (headRunner?.next && tailRunner?.next) {
    if (distance === k) {
      headRunner = headRunner.next;
    } else if (distance < k) {
      distance++;
    }

    tailRunner = tailRunner.next;
  }

  if (distance < k) {
    throw NOT_ENOUGH_VALUES_ERROR;
  }

  return headRunner.value;
} // I think I should ask whether 0th or 1st to the last is the last element

// plan: have two pointers > start both pointers from head of list > iterate the tail first until the distance between tail and head pointers is k
//   > get head pointer and head pointer should === kth to last element
// edge cases: list is not long enough (can't check length, so just check if distance < k after loop breaks), input index < 0
import ListNode, { insertValue } from "./util/ListNode";

// sum lists - takes the sum of a digit represented as a reversed linked list
// n - longest digit | time: O(n2) space: O(n)
export default function sumList(digitListA: ListNode<number>, digitListB: ListNode<number>): ListNode<number> {
  let digitRunnerA: ListNode<number> | null = digitListA.next;
  let digitRunnerB: ListNode<number> | null = digitListB.next;
  let remainder: number = 0;
  const resultList: ListNode<number> = new ListNode(0); // init head node

  while (digitRunnerA && digitRunnerB) { // O(n2)
    const sum: number = digitRunnerA.value + digitRunnerB.value + remainder; // I learned to use TS generics

    insertValue(resultList, sum % 10); // O(n)

    if (sum > 9) {
      remainder = Math.floor(sum / 10);
    } else {
      remainder = 0;
    }

    digitRunnerA = digitRunnerA.next;
    digitRunnerB = digitRunnerB.next;
  }

  // uneven length numbers
  while (digitRunnerA) {
    const sum: number = digitRunnerA.value + remainder;

    insertValue(resultList, sum);

    remainder = 0;
    digitRunnerA = digitRunnerA.next;
  }

  while (digitRunnerB) {
    const sum: number = digitRunnerB.value + remainder;

    insertValue(resultList, sum);

    remainder = 0;
    digitRunnerB = digitRunnerB.next;
  }

  // still has remainder
  if (remainder > 0) {
    insertValue(resultList, remainder);
  }

  return resultList;
}

// plan: loop through each digit until shortest length > keep track of remainders > add remainder to next list value
// edge cases: uneven length digits, remainders
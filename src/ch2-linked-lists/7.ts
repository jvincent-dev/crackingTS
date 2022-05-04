import ListNode from "./util/ListNode";

// intersecting - given two singly linked lists return the node reference which is intersecting
export default function intersecting(listA: ListNode<number | string>, listB: ListNode<number | string> | null): ListNode<number | string> {
  if (!listA || !listB) {
    throw new Error("No list intersection");
  }
  
  let runnerA: ListNode<number | string> | null = listA.next;
  let runnerB: ListNode<number | string> | null = listB.next;

  while(runnerA) {
    runnerB = listB.next;

    while(runnerB) {
      if (runnerA === runnerB) {
        return runnerB;
      }

      runnerB = runnerB.next;
    }

    runnerA = runnerA.next;
  }
  
  throw new Error("No list intersection");
}

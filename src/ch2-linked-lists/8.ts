import ListNode from "./util/ListNode";

// loop detection - check if a linkedlist has a loop
export default function loopDetection(head: ListNode<number | string>): ListNode<number | string> | null {
  const visitedNodes: Set<ListNode<number | string>> = new Set();
  let runner: ListNode<number | string> | null = head;

  while (runner && !visitedNodes.has(runner)) {
    visitedNodes.add(runner);
    runner = runner.next;
  }

  if (runner && visitedNodes.has(runner)) {
    return runner;
  }

  return null;
};
/**
 * plan
 * - init a stack of visited nodes > loop through nodes > if node is already visited: return false > repeat until all nodes are visited
 * edge cases
 * - runner is null (end of list is reached)
 * time: O(n), space: O(n)
 */
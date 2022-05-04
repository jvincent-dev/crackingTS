import ListNode from "../ch2-linked-lists/util/ListNode";
import Queue from "../ch3-stacks-and-queues/util/Queue";
import Graph, { GraphNode } from "./util/Graph";

// route between nodes - given a directed graph, find out whether there is a route between two nodes
export default function routeBetweenNodes(graph: Graph<number>, nodeA: GraphNode<number>, nodeB: GraphNode<number>): boolean {
  // use dfs > if nodeB is found: return true; else if all nodes are visited: return false
  const visitedNodes = new Set();
  const q: Queue<GraphNode<number>> = new Queue();

  // enqueue Graph nodes
  q.enqueue(new ListNode(nodeA));

  // run BFS while has nodes
  while (q.size()) {
    let currentNode = q.dequeue().value;
    visitedNodes.add(currentNode);

    if (currentNode === nodeB) {
      return true;
    }

    // enqueue unvisited children
    currentNode.children.forEach(child => {
      if (!visitedNodes.has(child)) {
        q.enqueue(new ListNode(child));
      }
    });
  }

  return false;
}

// const g: Graph<number> = new Graph();

// const zero = new GraphNode(0);
// g.add(zero);
// const one = new GraphNode(1);
// g.add(one);
// const two = new GraphNode(2);
// const three = new GraphNode(3);
// g.addEdge(two, three);
// g.addEdge(three, one);
// const four = new GraphNode(4);
// const five = new GraphNode(5);
// g.addEdge(four, zero);
// g.addEdge(four, one);
// g.addEdge(five, zero);
// g.addEdge(five, two);
// g.addEdge(one, five);
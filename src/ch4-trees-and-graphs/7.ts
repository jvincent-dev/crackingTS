// build order - given a list of projects and a list of dependencies, find a build order that will allow the projects to be built. All dependencies
//  must be built before the project is.
import Stack from "../ch3-stacks-and-queues/util/Stack";
import Graph, { GraphNode } from "./util/Graph";

function helper(currentNode: GraphNode<string>, stack: Stack<GraphNode<string>>, visitedNodes: Set<GraphNode<string>> = new Set()): void {
  if (stack.has(currentNode)) {
    return;
  } else if (visitedNodes.has(currentNode)) {
    throw new Error("No valid build: cycle graph detected");
  }

  visitedNodes.add(currentNode);

  currentNode.children.forEach(child => {
    if (child === currentNode) {
      throw new Error("No valid build: child is self");
    }

    helper(child, stack, visitedNodes);
  });

  stack.push(currentNode);
}

export default function buildOrder(graph: Graph<string>): Array<string> {
  const stack: Stack<GraphNode<string>> = new Stack();

  graph.nodes.forEach(node => helper(node, stack));

  const result: Array<string> = [];
  let node: GraphNode<string> | undefined = stack.pop();

  while (node) {
    result.push(node.label);
    node = stack.pop();
  }

  return result;
}

/**
 * plan
 * - bfs through graph > look for node without children > (scratch this)
 * - do dfs on each node till the last independent node > do the same for each child node that's not visited > reverse the stack for the result
 * cases
 * - separated nodes and must be DAG (directed acyclic graph)
 * time: O(ve) - vertices * edges, space: O(n) - for the result and visited nodes
 */

// nodes: a, b, c, d, e, f
// dependencies: (a, d), (f, b), (b, d), (f, a), (d, c)
// const graph: Graph<string> = new Graph();

// const nodes = [
//   "a",
//   "b",
//   "c",
//   "d",
//   "e",
//   "f"
// ].map(label => new GraphNode(label));

// nodes.forEach(node => graph.add(node));

// graph.addEdge(nodes[0], nodes[1]); // test 2
// graph.addEdge(nodes[1], nodes[2]); // test 2
// graph.addEdge(nodes[2], nodes[0]); // test 2

// graph.addEdge(nodes[0], nodes[3]); // test 1
// graph.addEdge(nodes[5], nodes[1]); // test 1
// graph.addEdge(nodes[1], nodes[3]); // test 1
// graph.addEdge(nodes[5], nodes[0]); // test 1
// graph.addEdge(nodes[3], nodes[2]); // test 1
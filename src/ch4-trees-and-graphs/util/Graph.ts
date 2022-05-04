// from CTCI book and https://bit.ly/37oDIV7
export class GraphNode<T> {
  label: T;
  children: Set<GraphNode<T>>;

  constructor(label: T) {
    this.label = label;
    this.children = new Set();
  }
}

const LABEL_WITH_DIFERENT_NODE_ERROR = new Error("Label already exists with different node");

export default class Graph<T> {
  nodes: Set<GraphNode<T>>;

  constructor() {
    this.nodes = new Set();
  }

  checkIfValidNode(graphNode: GraphNode<T>): void {
    let hasLabelWithDifferentNode = false;

    this.nodes.forEach(node => {
      const hasLabel = node.label === graphNode.label;
      const isSameNode = node === graphNode;

      if (hasLabel && !isSameNode) {
        hasLabelWithDifferentNode = true;
      }
    });

    if (hasLabelWithDifferentNode) {
      throw LABEL_WITH_DIFERENT_NODE_ERROR;
    }
  }

  add(newNode: GraphNode<T>): void {
    this.checkIfValidNode(newNode);

    if (!this.isInGraph(newNode)) {
      this.nodes.add(newNode);
    }
  }

  addEdge(source: GraphNode<T>, destination: GraphNode<T>): void {
    const edgeExists = source.children.has(destination);

    if (source === destination || edgeExists) {
      throw new Error("Source cannot be destination or edge already exists");
    } else {
      this.checkIfValidNode(source);
      this.checkIfValidNode(destination);
    }

    if (!this.isInGraph(source)) {
      this.nodes.add(source);
    }

    if (!this.isInGraph(destination)) {
      this.nodes.add(destination);
    }

    source.children.add(destination);
  }

  // TODO: add delete node

  isInGraph(node: GraphNode<T>): boolean {
    return this.nodes.has(node);
  }

  print(): void {
    this.nodes.forEach(node => console.log(node.label, node.children));
  }
}
// plan: if source and destination are not in nodes, add them > if they already exist or have the same values: throw error > add destination to
// source's children
// edge cases: source and dest are same throw error; source and dest already exist throw error; has an existing label, but not the node
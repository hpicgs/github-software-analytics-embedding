import { DirectoryNode, MetricsNode, NodeType } from "@analytics/types";

export default class MetricsTree {
  root: MetricsNode;

  constructor(root: MetricsNode) {
    this.root = root;
  }

  get depth(): number {
    return this.recursiveDepth(this.root);
  }

  recursiveDepth(node: MetricsNode): number {
    if (node.type === NodeType.FILE) return 0;
    const dirNode = node as DirectoryNode;
    const depths = dirNode.children.map((child) =>
      child ? this.recursiveDepth(child) : 0
    );
    return Math.max(...depths) + 1;
  }

  get size(): number {
    return this.recursiveSize(this.root);
  }

  recursiveSize(node: MetricsNode): number {
    if (node.type === NodeType.FILE) return 1;
    const dirNode = node as DirectoryNode;
    const sizes = dirNode.children.map((child) =>
      child ? this.recursiveSize(child) : 0
    );
    return sizes.reduce((a, b) => a + b, 1);
  }
}

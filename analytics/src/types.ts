interface FileMetrics {
  [key: string]: any;
}

interface MetricsTableData {
  header: string[];
  rows: FileMetrics[];
}

enum NodeType {
  FILE = "file",
  DIRECTORY = "directory",
}

interface MetricsNode {
  path: string;
  name: string;
  type: NodeType;
}

interface DirectoryNode extends MetricsNode {
  type: NodeType.DIRECTORY;
  children: Array<MetricsNode | null>;
}

interface FileNode extends MetricsNode {
  type: NodeType.FILE;
  metrics: Object;
}

export {
  FileMetrics,
  MetricsTableData,
  NodeType,
  MetricsNode,
  DirectoryNode,
  FileNode,
};

export interface FileMetrics {
  [key: string]: any;
}

export interface MetricsTableData {
  header: string[];
  rows: FileMetrics[];
}

export enum NodeType {
  FILE = "file",
  DIRECTORY = "directory",
}

export interface MetricsNode {
  path: string;
  name: string;
  type: NodeType;
}

export interface DirectoryNode extends MetricsNode {
  type: NodeType.DIRECTORY;
  children: Array<MetricsNode | null>;
}

export interface FileNode extends MetricsNode {
  type: NodeType.FILE;
  metrics: Object;
}

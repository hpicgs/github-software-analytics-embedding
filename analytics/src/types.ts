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

export interface Metrics {
  loc: number;
  noc: number;
  cloc: number;
  dc: number;
  nof: number;
}

export interface MetricsNode {
  path: string;
  name: string;
  type: NodeType;
  metrics: Metrics;
}

export interface DirectoryNode extends MetricsNode {
  type: NodeType.DIRECTORY;
  children: MetricsNode[];
}

export interface FileNode extends MetricsNode {
  type: NodeType.FILE;
}

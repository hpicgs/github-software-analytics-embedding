export interface FileMetrics extends Metrics {
  filename: string;
}

export interface Metrics {
  blanks: number;
  code: number;
  comments: number;
  lines: number;
}

export interface MetricsTableData {
  header: string[];
  rows: FileMetrics[];
}

export interface FileTree {
  root: TreeNode;
}

export interface TreeNode {
  name: string;
  children: TreeNode[];
  metrics?: Metrics;
}

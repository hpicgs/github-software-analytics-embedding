export interface FileMetrics extends Metrics {
  filename: string;
}

export interface Metrics {
  loc: number;
  noc: number;
  cloc: number;
  dc: number;
  nof: number;
}

export interface TokeiMetrics {
  filename: string;
  blanks: number;
  code: number;
  comments: number;
  lines: number;
}

export interface MetricsTableData {
  header: string[];
  rows: TokeiMetrics[];
}

export interface FileTree {
  root: TreeNode;
}

export interface TreeNode {
  name: string;
  children: TreeNode[];
  metrics?: TokeiMetrics;
}

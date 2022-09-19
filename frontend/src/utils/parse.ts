import Papa from "papaparse";
import { FileMetrics, MetricsNode, MetricsTableData } from "@analytics/types";
import MetricsTree from "./metricstree";

export function parseMetrics(csv: string): MetricsTableData {
  const parsed = Papa.parse<FileMetrics>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  return {
    header: parsed.meta.fields!,
    rows: parsed.data,
  };
}

export function parseMetricsJSON(json: string): MetricsTree {
  const parsed = JSON.parse(json);
  const root_node = parsed as MetricsNode;
  const metricsTree = new MetricsTree(root_node);
  return metricsTree;
}

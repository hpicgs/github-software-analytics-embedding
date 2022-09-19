import Papa from "papaparse";
import { FileMetrics, MetricsNode, MetricsTableData } from "@analytics/types";

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

export function parseMetricsJSON(json: string): MetricsNode {
  const parsed = JSON.parse(json);
  return parsed as MetricsNode;
}

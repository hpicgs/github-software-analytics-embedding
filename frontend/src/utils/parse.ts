import Papa from "papaparse";
import { FileMetrics, MetricsTableData } from "@analytics/types";

export function parseMetrics(csv: string): MetricsTableData {
  const parsed = Papa.parse<FileMetrics>(csv, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  return {
    header: parsed.meta.fields!,
    rows: parsed.data,
  };
}

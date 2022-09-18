import Papa from "papaparse";
import { FileMetrics, MetricsTableData } from "../../../analytics/src/types";

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

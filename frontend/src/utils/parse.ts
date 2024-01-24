import Papa from "papaparse";
import { FileMetrics, MetricsTableData, TokeiMetrics } from "@analytics/types";

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

export function metricsFromJSON(json: string): MetricsTableData {
  const data = JSON.parse(json);
  let tokeiMetricsArray: TokeiMetrics[] = [];

  for (const language in data) {
    const files = data[language].reports;

    // Iterating through each file
    files.forEach((file: any) => {
      const metrics: TokeiMetrics = {
        filename: file.name,
        blanks: file.stats.blanks,
        code: file.stats.code,
        comments: file.stats.comments,
        lines: file.stats.blanks + file.stats.code + file.stats.comments
      };

      tokeiMetricsArray.push(metrics);
    });
  }

  return {
    header: ["filename", "blanks", "code", "comments", "lines"],
    rows: tokeiMetricsArray,
  };
}

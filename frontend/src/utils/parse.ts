import { MetricsTableData, FileMetrics } from "@analytics/types";


export function metricsFromJSON(json: string): MetricsTableData {
  const data = JSON.parse(json);
  let metricsArray: FileMetrics[] = [];

  for (const language in data) {
    const files = data[language].reports;

    // Iterating through each file
    files.forEach((file: any) => {
      const metrics: FileMetrics = {
        filename: file.name,
        blanks: file.stats.blanks,
        code: file.stats.code,
        comments: file.stats.comments,
        lines: file.stats.blanks + file.stats.code + file.stats.comments
      };

      metricsArray.push(metrics);
    });
  }

  return {
    header: ["filename", "blanks", "code", "comments", "lines"],
    rows: metricsArray,
  };
}

import Papa from "papaparse";
import MetricsTableData from "../types/MetricTable";

export default function parseMetrics(csv: string): MetricsTableData {
    const results = Papa.parse(csv, { header: true });
    return results.data;
}


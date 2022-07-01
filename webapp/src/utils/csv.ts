import Papa from "papaparse";
import { FileMetrics, MetricsTableData } from "../types/FileMetrics";

export default function parseMetrics(csv: string): MetricsTableData {
    const parsed = Papa.parse<FileMetrics>(csv, { header: true, skipEmptyLines: true });
    return {
        header: parsed.meta.fields!,
        rows: parsed.data
    };
}


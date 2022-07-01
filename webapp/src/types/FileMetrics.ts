export interface FileMetrics {
    [key: string]: Object;
}

export interface MetricsTableData {
    header: string[];
    rows: FileMetrics[];
}

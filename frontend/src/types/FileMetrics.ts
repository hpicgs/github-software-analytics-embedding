export interface FileMetrics {
    [key: string]: any;
}

export interface MetricsTableData {
    header: string[];
    rows: FileMetrics[];
}

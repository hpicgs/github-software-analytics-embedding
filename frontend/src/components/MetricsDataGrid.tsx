import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { MetricsTableData, TokeiMetrics } from "@analytics/types";

function getRowId(row: TokeiMetrics) {
    return row.filename;
}



export default function MetricsTable({ header, rows }: MetricsTableData) {

    const value_width = 130

    const columns: GridColDef[] = [
        { field: 'filename', headerName: 'Filename', type: "string", flex: 1 },
        {
            field: 'lines',
            headerName: 'Total Lines',
            type: 'number',
            width: value_width
        },
        {
            field: 'code',
            headerName: 'Lines of Code',
            type: 'number',
            width: value_width
        },
        {
            field: 'blanks',
            headerName: 'Blank Lines',
            type: 'number',
            width: value_width
        },
        {
            field: 'comments',
            headerName: 'Commented Lines',
            type: "number",
            width: value_width,
        },
        // {
        //     field: 'comments',
        //     headerName: 'Commented Lines',
        //     description: 'This column has a value getter and is not sortable.',
        //     width: 1value_width,
        //     valueGetter: (params: GridValueGetterParams) =>
        //         `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        // },
    ];

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            disableRowSelectionOnClick
            getRowId={getRowId}
            disableColumnMenu
            density="compact"
        />
    );
}
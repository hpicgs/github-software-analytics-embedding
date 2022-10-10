import * as React from 'react';
import { MetricsTableData } from '@analytics/types';
import { Chip, Stack, Container } from '@mui/material';


export default function MetricsTable({ header, rows }: MetricsTableData) {
    const totalLoc = rows.reduce((acc, row) => acc + row.loc, 0);
    const totalNoc = rows.reduce((acc, row) => acc + row.noc, 0);
    const totalCloc = rows.reduce((acc, row) => acc + row.cloc, 0);
    const averageDc = rows.reduce((acc, row) => acc + row.dc, 0) / rows.length;
    const totalNof = rows.reduce((acc, row) => acc + row.nof, 0);

    const numFiles = rows.length;
    return (
        <Container>
            <Stack direction="row" spacing={2}>
                <Chip label={`${numFiles} files`} variant="outlined" />
                <Chip label={`${totalLoc} lines of code`} variant="outlined" />
            </Stack>
        </Container>
  );
}

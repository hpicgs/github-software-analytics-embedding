import * as React from 'react';
import { MetricsTableData } from '@analytics/types';
import { Chip, Stack, Container } from '@mui/material';
import prettyBytes from 'pretty-bytes';

interface MetaMetricsProps extends MetricsTableData {
    size: number;
}

export default function MetaMetrics({ header, rows, size }: MetaMetricsProps) {
    const totalLoc = rows.reduce((acc, row) => acc + row.loc, 0);
    return (
        <Container>
            <Stack direction="row" spacing={2}>
                <Chip label={`${rows.length} files`} variant="outlined" />
                <Chip label={`${totalLoc} lines of code`} variant="outlined" />
                <Chip label={`${prettyBytes(size)} of metrics stored`} variant="outlined" />
            </Stack>
        </Container>
  );
}

import * as React from 'react';
import { MetricsTableData, TokeiMetrics } from '@analytics/types';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export default function MetricsTable({header, rows}: MetricsTableData) {
  return (
    <TableContainer component={Card}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a metrics table">
        <TableHead>
          <TableRow>
          {header.map((key) => (
            <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.filename}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {header.map((key) => (
              <TableCell component="th" scope="row" key={key + row.filename}>
                {row[key as keyof TokeiMetrics]}
              </TableCell>
            ))}
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
  );
}

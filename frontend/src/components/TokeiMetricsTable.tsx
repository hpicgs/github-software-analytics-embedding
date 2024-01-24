import * as React from 'react';
import { MetricsTableData, TokeiMetrics } from '@analytics/types';
import { Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


export default function TokeiMetricsTable(tokeiMetrics: TokeiMetrics[]) {
const headers = ["filename", "blank", "comment", "code", "lines"]
  return (
    <TableContainer component={Card}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a metrics table">
        <TableHead>
          <TableRow>
          {headers.map((key) => (
            <TableCell key={key}>{key}</TableCell>
            ))}
          </TableRow><
        </TableHead>
        <TableBody>
          {tokeiMetrics.map((fileMetrics) => (
            <TableRow
              key={fileMetrics.filename}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            {headers.map((key) => (
              <TableCell component="th" scope="row" key={key + fileMetrics.filename}>
                {fileMetrics[key as keyof TokeiMetrics]}
              </TableCell>
            ))}
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
  );
}

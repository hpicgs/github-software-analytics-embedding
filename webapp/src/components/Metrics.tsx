import { useState, useEffect } from "react";
import MetricsTableData from "../types/MetricTable";
import parseMetrics from "../utils/csv";
import "./Metrics.css";
import MetricsTable from "./MetricsTable";

export default function Metrics() {
  const [data, setData] = useState<MetricsTableData>();

  useEffect(() => {
    async function getData() {
      const response = await fetch("./metrics.csv");
      const reader = response.body?.getReader();
      const result = await reader?.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result?.value);
      const metricTableData = parseMetrics(csv)
      console.log(metricTableData);
      setData(metricTableData);
    }
    getData();
  }, []);

  return (
    <div>
      <h1>Metrics</h1>
      <h3>Calculated Metrics: </h3>
      <MetricsTable data={data} />
      <h3>Generated Treemap: </h3>
    </div>
  );
}

const DataTable = ({ data }: any) => {
  const keys = [...new Set(data.map((row: Object) => Object.keys(row)).flat())];
  return (
    <div>
      <table border={1}>
        <TableHeader keys={keys} />
        {data.map((row: object) => (
          <TableRow row={row} />
        ))}
      </table>
    </div>
  );
};
const TableRow = ({ row }: any) => {
  const rowKeys = Object.keys(row);
  return (
    <tr>
      {rowKeys.map((key: string) => {
        return <td key={key}>{row[key]}</td>;
      })}
    </tr>
  );
};

const TableHeader = ({ keys }: any) => {
  return (
    <tr>
      {keys.map((key: string) => (
        <th>{key}</th>
      ))}
    </tr>
  );
};

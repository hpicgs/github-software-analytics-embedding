import { useState, useEffect } from "react";
import parseMetrics from "../utils/csv";
import MetricsTable from "./MetricsTable";
import { useParams } from 'react-router-dom';
import { getMetrics } from "@/utils/github";
import {MetricsTableData} from "../types/FileMetrics";

export default function Metrics() {
  let { owner, repo, commit_SHA } = useParams();
  
  const [data, setData] = useState<MetricsTableData>();


  useEffect(() => {
    async function fetchData() {
      const csv = await getMetrics('hpicgs', 'github-software-analytics-embedding', '5b337b8409f2a2d3b1b14f85d52a97a0258fe256')
      const parsedData = parseMetrics(csv);
      console.log(parsedData);
      setData(parsedData);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Metrics</h1>
      <h3>Calculated Metrics: </h3>
      {data ? <MetricsTable {...data} /> : <p>Loading...</p>}
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

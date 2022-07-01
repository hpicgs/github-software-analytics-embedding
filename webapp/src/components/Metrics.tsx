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
      if(!owner || !repo || !commit_SHA) return;
      const csv = await getMetrics(owner, repo, commit_SHA);
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

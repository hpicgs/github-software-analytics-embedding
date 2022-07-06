import { useState, useEffect } from "react";
import parseMetrics from "../utils/csv";
import MetricsTable from "./MetricsTable";
import { useParams } from 'react-router-dom';
import { getMetrics } from "@/utils/github";
import {MetricsTableData} from "../types/FileMetrics";
import { Breadcrumbs, Divider, Typography } from "@mui/material";

export default function Metrics() {
  let { owner, repo, commitSHA } = useParams();
  
  const [data, setData] = useState<MetricsTableData>();
  const breadcrumbs = [
    <Typography key="1" color="text.secondary">
      {owner}
    </Typography>,
    <Typography key="2" color="text.secondary">
      {repo}
    </Typography>,
    <Typography key="3" color="text.primary">
      {commitSHA}
    </Typography>
  ]

  useEffect(() => {
    async function fetchData() {
      if(!owner || !repo || !commitSHA) return;
      const csv = await getMetrics(owner, repo, commitSHA);
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
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        {breadcrumbs}
      </Breadcrumbs>
      <Divider/>
      {data ? <MetricsTable {...data} /> : <p>Loading...</p>}
      <h3>Generated Treemap: </h3>
    </div>
  );
}

import { useState, useEffect } from "react";
import parseMetrics from "../utils/csv";
import MetricsTable from "./MetricsTable";
import { useParams } from 'react-router-dom';
import { getMetrics } from "@/utils/github";
import {MetricsTableData} from "../types/FileMetrics";
import { Breadcrumbs, Divider, Stack, Typography } from "@mui/material";

export default function Metrics() {
  let { owner, repo, commitSHA } = useParams();
  
  const [data, setData] = useState<MetricsTableData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

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
      if (!owner || !repo || !commitSHA) return;
      try {
        const csv = await getMetrics(owner, repo, commitSHA);
        const parsedData = parseMetrics(csv);
        console.log(parsedData);
        setData(parsedData);
      } catch (e) {
        setError(true)
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Metrics</h1>
      <Stack spacing={2}>
        <div>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {breadcrumbs}
          </Breadcrumbs>
          <Divider />
        </div>
        {error && <p>No metrics data found.</p>}
        {loading && <p>Loading...</p>}
        {data && <MetricsTable {...data} />}
      </Stack>
    </div>
  );
}

import { useState, useEffect } from "react";
import { parseMetrics, parseMetricsJSON } from "../utils/parse";
import MetricsTable from "./MetricsTable";
import { useParams } from 'react-router-dom';
import { getCommitSHA, getMetricsBlob } from "@/utils/github";
import { MetricsNode, MetricsTableData } from "@analytics/types";
import { Breadcrumbs, Divider, Stack, Typography } from "@mui/material";
import Treemap from "./Treemap";

type MetricsProps = {
  owner?: string;
  repo?: string;
  commitSHA?: string;
  branch?: string;
};

export default function Metrics({
  owner,
  repo,
  commitSHA,
  branch,
}: MetricsProps) {
  const [data, setData] = useState<MetricsTableData>();
  const [metricsTree, setMetricsTree] = useState<MetricsNode>();
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
      {branch ? branch : commitSHA}
    </Typography>,
  ];

  useEffect(() => {
    async function fetchData() {
      if (!owner || !repo) return;
      if (!commitSHA) {
        if (!branch) return;
        commitSHA = await getCommitSHA(owner, repo, branch);
      }
      try {
        const [csv, json] = await getMetricsBlob(owner, repo, commitSHA);
        const metricsTree = parseMetricsJSON(json)
        
        console.log("tree:", metricsTree);
        setMetricsTree(metricsTree);
        const parsedData = parseMetrics(csv);
        setData(parsedData);
      } catch (e) {
        console.error(e);
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
        {metricsTree && <Treemap {...metricsTree} />}
      </Stack>
    </div>
  );
}

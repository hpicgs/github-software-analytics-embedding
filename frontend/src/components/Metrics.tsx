import { useState, useEffect } from "react";
import { parseMetrics } from "../utils/parse";
import MetricsTable from "./MetricsTable";
import { getCommitSHA, getMetricsBlob } from "@/utils/github";
import { MetricsTableData } from "@analytics/types";
import { Breadcrumbs, LinearProgress, Stack, Typography, Box, Paper, Link } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';

import Treemap from "./Treemap";
import MetaMetrics from "./MetaMetrics";
import { Link as RouterLink } from "react-router-dom";

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
  const [size, setSize] = useState<number>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  const breadcrumbs = [
    <Typography key="1" color="text.secondary">
      {owner}
    </Typography>,
    <Typography key="2" color="text.secondary">
      <Link component={RouterLink} to={`/${owner}/${repo}/`}>{repo}</Link>
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
        const [metricsBlob] = await getMetricsBlob(owner, repo, commitSHA);
        const parsedData = parseMetrics(metricsBlob.content);
        console.log("parsedData:", parsedData);
        setData(parsedData);
        setSize(metricsBlob.size);
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
    <Paper elevation={2}>
      <Stack spacing={2}>
        <Box m={2}>
          <Stack direction="row" spacing={1}>
            <RouterLink to={"/"}>
              <GitHubIcon />
            </RouterLink>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Box>
        {loading && <LinearProgress />}
        {error && <p>No metrics data found.</p>}
        {data && <Treemap {...data} />}
        {data && size && <MetaMetrics size={size} {...data} />}
        {data && <MetricsTable {...data} />}
      </Stack>
    </Paper>
  );
}

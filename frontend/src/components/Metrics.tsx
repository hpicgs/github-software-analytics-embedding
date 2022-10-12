import { useState, useEffect } from "react";
import { parseMetrics } from "../utils/parse";
import MetricsTable from "./MetricsTable";
import { getCommitSHA, getMetricsBlob } from "@/utils/github";
import { MetricsTableData } from "@analytics/types";
import { LinearProgress, Stack, Typography, Paper } from "@mui/material";

import Treemap from "./Treemap";
import MetaMetrics from "./MetaMetrics";
import NoMetrics from "./NoMetrics";

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
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Stack spacing={2}>
      {loading && <LinearProgress />}
      {error && <NoMetrics />}
      {data && <Treemap {...data} />}
      {data && size && <MetaMetrics size={size} {...data} />}
      {data && <MetricsTable {...data} />}
    </Stack>
  );
}

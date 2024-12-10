import { useState, useEffect } from "react";
import { metricsFromJSON } from "../utils/parse";
import { getCommitSHA, getMetricsBlob } from "@frontend/utils/github";
import { MetricsTableData } from "@analytics/types";
import { LinearProgress, Stack, Typography, Paper } from "@mui/material";
import Treemap from "./Treemap";
import MetaMetrics from "./MetaMetrics";
import NoMetrics from "./NoMetrics";
import MetricsDataGrid from "./MetricsDataGrid";
import logger from "@frontend/utils/logger";

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
        logger.debug("commitSHA:", commitSHA);
      }
      try {
        const [metricsBlob] = await getMetricsBlob(owner, repo, commitSHA, ["metrics.json"]);
        const parsedData = metricsFromJSON(metricsBlob.content);

        logger.debug("parsedData:", parsedData);
        setData(parsedData);
        setSize(metricsBlob.size);
      } catch (e) {
        logger.error(e);
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
      {data && <MetricsDataGrid {...data} />}
    </Stack>
  );
}

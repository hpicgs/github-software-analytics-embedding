import { useState, useEffect } from "react";
import { metricsFromJSON, parseMetrics } from "../utils/parse";
import MetricsTable from "./MetricsTable";
import { getCommitSHA, getMetricsBlob } from "@/utils/github";
import { MetricsTableData } from "@analytics/types";
import { LinearProgress, Stack, Typography, Paper } from "@mui/material";
import metrics from "../metrics.json"
import Treemap from "./Treemap";
import MetaMetrics from "./MetaMetrics";
import NoMetrics from "./NoMetrics";
import MetricsDataGrid from "./MetricsDataGrid";

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
      // if (!owner || !repo) return;
      // if (!commitSHA) {
      //   if (!branch) return;
      //   commitSHA = await getCommitSHA(owner, repo, branch);
      //   console.log(commitSHA);
      // }
      try {
        //const [metricsBlob] = await getMetricsBlob(owner, repo, commitSHA, ["metrics.json"]);
        //const parsedData = parseMetrics(metricsBlob.content);

        // Converting the Buffer into a string
        const jsonString = JSON.stringify(metrics)
        const parsedData = metricsFromJSON(jsonString/*metricsBlob.content*/);

        console.log("parsedData:", parsedData);
        setData(parsedData);
        //setSize(metricsBlob.size);
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
      {/* {data && size && <MetaMetrics size={size} {...data} />} */}
      {data && <MetricsDataGrid {...data} />}
    </Stack>
  );
}

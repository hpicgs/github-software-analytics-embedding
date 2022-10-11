import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Metrics from "./Metrics";

export default function MetricsPage() {
  const { owner, repo, commitSHA, branch } = useParams();

  return (
    <Box mb={8}>
      <Metrics owner={owner} repo={repo} commitSHA={commitSHA} branch={branch} />
    </Box>
  );
}

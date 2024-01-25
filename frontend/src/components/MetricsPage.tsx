import { Box, Paper, Stack, Typography, Link } from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import Metrics from "./Metrics";
import RepoBreadcrumbs from "./RepoBreadcrumbs";

export default function MetricsPage() {
  const { owner, repo, commitSHA, branch } = useParams();
  console.log(owner, repo, commitSHA, branch);
  const breadcrumbs = [
    <Typography key="1" color="text.secondary">
      {owner}
    </Typography>,
    <Typography key="2" color="text.secondary">
      <Link component={RouterLink} to={`/${owner}/${repo}/`}>
        {repo}
      </Link>
    </Typography>,
    <Typography key="3" color="text.primary">
      {branch ? branch : commitSHA}
    </Typography>,
  ];

  return (
    <Box mb={8}>
      <Paper elevation={2}>
        <Stack spacing={2}>
          <RepoBreadcrumbs breadcrumbs={breadcrumbs} />
          <Metrics
            owner={owner}
            repo={repo}
            commitSHA={commitSHA}
            branch={branch}
          />
        </Stack>
      </Paper>
    </Box>
  );
}

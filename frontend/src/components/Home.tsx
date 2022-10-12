import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  const owner = "hpicgs";
  const repo = "github-software-analytics-embedding";
  return (
    <Container>
      <Typography variant="h4" my={4}>
        Treemap Metrics Viewer
      </Typography>
      <Stack spacing={2}>
        <Link to="/hpicgs/github-software-analytics-embedding/">
          hpicgs/github-software-analytics-embedding/
        </Link>
        <Link to="/Jasperhino/vscode/">Jasperhino/vscode</Link>
        <Link to="/Jasperhino/webgl-operate/">Jasperhino/webgl-operate</Link>
      </Stack>
    </Container>
  );
}

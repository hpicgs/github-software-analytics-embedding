import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  getBranches,
  getMetricCommits,
  ListRefsResponseType,
  ListBranchesResponseType,
} from "@/utils/github";
import RepoBreadcrumbs from "./RepoBreadcrumbs";
import { Link as RouterLink } from "react-router-dom";

interface RepoParams {
  owner: string;
  repo: string;
}

export default function Repo({ owner, repo }: RepoParams) {
  const [refs, setRefs] = useState<ListRefsResponseType>();
  const [branches, setBranches] = useState<ListBranchesResponseType>();

  useEffect(() => {
    async function fetchData() {
      const branches = await getBranches(owner, repo);
      console.log(branches);
      setBranches(branches);
      const refs = await getMetricCommits(owner, repo);
      console.log(refs);
      setRefs(refs);
    }
    fetchData();
  }, []);

  const breadcrumbs = [
    <Typography key="1" color="text.secondary">
      {owner}
    </Typography>,
    <Typography key="2" color="text.secondary">
      <Link component={RouterLink} to={`/${owner}/${repo}/`}>
        {repo}
      </Link>
    </Typography>,
  ];

  return (
    <Container>
      <RepoBreadcrumbs breadcrumbs={breadcrumbs} />
      <Stack spacing={4}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Branches</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branches &&
                branches.data.map((branch) => (
                  <TableRow
                    key={branch.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        component={RouterLink}
                        to={`/${owner}/${repo}/branches/${branch.name}`}
                      >
                        {branch.name}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Commits</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {refs &&
                refs.data.map((ref) => (
                  <TableRow
                    key={ref.ref}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Link
                        component={RouterLink}
                        to={`/${owner}/${repo}/${ref.ref.split("/").pop()}`}
                      >
                        {ref.ref}
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </Container>
  );
}

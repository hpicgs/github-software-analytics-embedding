import React, { useEffect, useState } from 'react'
import { Button, Container, Paper, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import { getBranches, getMetricCommits, ListRefsResponseType, ListBranchesResponseType } from '@/utils/github'

export default function Home() {
  const navigate = useNavigate()
  const owner = 'hpicgs'
  const repo = 'github-software-analytics-embedding'
  const [refs, setRefs] = useState<ListRefsResponseType>()
  const [branches, setBranches] = useState<ListBranchesResponseType>()

  useEffect(() => {
    async function fetchData() {
      const branches = await getBranches(owner, repo);
      console.log(branches)
      setBranches(branches)
      const refs = await getMetricCommits(owner, repo)
      console.log(refs)
      setRefs(refs)
    }
    fetchData()
  }, [])

  return (
    <Container>
      <h1>HiViSer Metrics Dashboard</h1>
      <Stack spacing={4}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Branches</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {branches && branches.data.map((branch) => (
              <TableRow
                key={branch.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link component={RouterLink} to={`/${owner}/${repo}/${branch.commit.sha}`}>{branch.name}</Link>
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
              {refs && refs.data.map((ref) => (
              <TableRow
                key={ref.ref}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link underline="hover" to={`/${owner}/${repo}/${ref.ref.split('/').pop()}`}>{ref.ref}</Link>
                </TableCell>
              </TableRow>
            ))}
            </TableBody>
          </Table>
        </TableContainer>  
      </Stack>
    </Container>
  )
}

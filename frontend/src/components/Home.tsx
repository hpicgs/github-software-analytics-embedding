import React from 'react'
import { Container, Stack, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'



export default function Home() {
    const owner = 'hpicgs'
    const repo = 'github-software-analytics-embedding'
  return (
    <Container>
      <h1>Metrics Dashboard</h1>
          <Stack spacing={4}>
              <Link component={RouterLink} to={`/${owner}/${repo}/}`}>{owner} / {repo}</Link>
          </Stack>
    </Container>
  )
}

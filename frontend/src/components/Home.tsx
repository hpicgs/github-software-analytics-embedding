import React from 'react'
import { Container, Stack, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'



export default function Home() {
    const owner = 'hpicgs'
    const repo = 'github-software-analytics-embedding'
  return (
    <Container>
      <Typography variant='h4' my={4}>Treemap Metrics Viewer</Typography>
      <Stack spacing={2}>
        <Link component={RouterLink} to={'/hpicgs/github-software-analytics-embedding/'}>hpicgs/github-software-analytics-embedding/</Link>
        <Link component={RouterLink} to={'/Jasperhino/vscode/'}>Jasperhino/vscode</Link>
        <Link component={RouterLink} to={'/Jasperhino/webgl-operate/'}>Jasperhino/webgl-operate</Link>
      </Stack>
    </Container>
  )
}

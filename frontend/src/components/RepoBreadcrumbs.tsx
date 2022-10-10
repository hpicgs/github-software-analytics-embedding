import React from 'react'
import { Box, Stack, Breadcrumbs } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Link as RouterLink } from 'react-router-dom'

interface RepoBreadcrumbsProps {
  breadcrumbs: JSX.Element[]
}

export default function RepoBreadcrumbs({breadcrumbs}: RepoBreadcrumbsProps) {
    return (<Box m={2}>
      <Stack direction="row" spacing={1}>
        <RouterLink to={"/"}>
          <GitHubIcon />
        </RouterLink>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Box>)
}
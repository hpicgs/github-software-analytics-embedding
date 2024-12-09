import React from 'react';
import { Box, Stack, Breadcrumbs, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link as RouterLink } from "react-router-dom";

interface RepoBreadcrumbsProps {
  breadcrumbs: React.ReactNode[];
}

export default function RepoBreadcrumbs({ breadcrumbs }: RepoBreadcrumbsProps) {
  return (
    <Box m={2}>
      <Stack direction="row" spacing={1}>
        <Link component={RouterLink} to="/" underline="none" color="black">
          <GitHubIcon />
        </Link>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Box>
  );
}

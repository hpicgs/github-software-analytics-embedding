import { Box, Stack, Breadcrumbs, Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

interface RepoBreadcrumbsProps {
  breadcrumbs: JSX.Element[];
}

export default function RepoBreadcrumbs({ breadcrumbs }: RepoBreadcrumbsProps) {
  return (
    <Box m={2}>
      <Stack direction="row" spacing={1}>
        <Link href="/" underline="none" color="black">
          <GitHubIcon />
        </Link>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
    </Box>
  );
}

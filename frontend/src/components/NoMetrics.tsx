import { Stack, Box, Typography } from "@mui/material";

export default function NoMetrics() {
  return (
    <Box m={4}>
      <Stack spacing={2} mb={4}>
        <Typography variant="h4">No Metrics found :(</Typography>
        <Typography>
          There are no metrics for this commit on the repository.
        </Typography>
      </Stack>
    </Box>
  );
}

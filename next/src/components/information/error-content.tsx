import { Stack, Typography } from "@mui/material";

export default function ErrorContent() {
  return (
    <>
      <Stack mb={2}>
        <Typography variant="h6">
          Something went wrong. Try again later.
        </Typography>
      </Stack>
    </>
  );
}

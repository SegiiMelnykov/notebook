import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { paths } from "src/routes/paths";

export default function NotAuthorized() {
  return (
    <>
      <Stack mb={2}>
        <Typography variant="h6">
          <Link to={paths.auth.login} color="primary">
            Sign in
          </Link>{" "}
          or{" "}
          <Link to={paths.auth.register} color="primary">
            sign up
          </Link>{" "}
          to manage the list of dictionaries
        </Typography>
      </Stack>
    </>
  );
}

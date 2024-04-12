import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthForm from "../auth-form";
// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

// config

// ----------------------------------------------------------------------

export default function LoginView() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5 }} alignItems={"center"}>
        <Typography variant="h4">Sign in to Dictionary</Typography>

        <Stack direction="row" spacing={0.5}>
          <Typography variant="body2">New user?</Typography>

          <Link
            component={RouterLink}
            href={paths.auth.register}
            variant="subtitle2"
          >
            Create an account
          </Link>
        </Stack>
        <AuthForm isLoginPage />
      </Stack>
    </>
  );
}

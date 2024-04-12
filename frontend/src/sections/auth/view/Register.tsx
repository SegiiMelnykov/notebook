import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthForm from "../auth-form";
// routes
import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/components";

// ----------------------------------------------------------------------

export default function RegisterView() {
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, position: "relative" }}>
      <Typography variant="h4">Get started absolutely free</Typography>

      <Stack direction="row" spacing={0.5} justifyContent={"center"}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link
          href={paths.auth.login}
          component={RouterLink}
          variant="subtitle2"
        >
          Sign in
        </Link>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: "text.secondary",
        mt: 2.5,
        typography: "caption",
        textAlign: "center",
      }}
    >
      {"By signing up, I agree to "}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {" and "}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  return (
    <>
      <Stack alignItems={"center"}>
        {renderHead}
        <AuthForm isLoginPage={false} />
        {renderTerms}
      </Stack>
    </>
  );
}

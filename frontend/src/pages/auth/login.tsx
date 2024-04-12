import { Helmet } from "react-helmet-async";
// sections
import LoginView from "src/sections/auth/view/Login";

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <LoginView />
    </>
  );
}

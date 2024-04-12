// @mui
import Box from "@mui/material/Box";
// routes
import { usePathname } from "src/routes/hook";
//
import Footer from "./footer";
import Header from "./header";
import { useAppSelector } from "src/hooks/use-redux";
import LoginPage from "src/pages/auth/login";
import { Container } from "@mui/material";
import { useAuthQuery } from "src/store/auth/auth.api";
import { useCheckAuth } from "src/hooks/use-checkAuth";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  // const { isLoading } = useCheckAuth({ user });
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 1 }}>
      <Header />

      <Container
        component="main"
        sx={{
          flexGrow: 1,
          pt: { xs: 8, md: 10 },
        }}
      >
        {children}
      </Container>

      <Footer />
    </Box>
  );
}

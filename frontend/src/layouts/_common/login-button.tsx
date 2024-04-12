// @mui
import { Theme, SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
// routes
import { paths } from "src/routes/paths";
import { useAppSelector } from "src/hooks/use-redux";
import { useAuthActions } from "src/hooks/use-auth";
import { useNavigate } from "react-router-dom";
import { useResponsive } from "src/hooks/use-responsive";
// auth

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const { logOut } = useAuthActions();
  const mdUp = useResponsive("up", "md");
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut(null);
    navigate("/");
  };
  const handleClick = () => {
    user ? handleLogout() : navigate(paths.auth.login);
  };
  return (
    <Button
      onClick={handleClick}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
      size={mdUp ? "medium" : "small"}
    >
      {user ? "Log out" : "Log in"}
    </Button>
  );
}

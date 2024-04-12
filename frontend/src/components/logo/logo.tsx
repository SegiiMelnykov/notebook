import { forwardRef } from "react";
// @mui
import { useTheme } from "@mui/material/styles";
import Link from "@mui/material/Link";
import Box, { BoxProps } from "@mui/material/Box";
// routes
import { RouterLink } from "src/routes/components";

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, ...other }, ref) => {
    const theme = useTheme();

    const PRIMARY_LIGHT = theme.palette.primary.light;

    const PRIMARY_MAIN = theme.palette.primary.main;

    const PRIMARY_DARK = theme.palette.primary.dark;

    // OR using local (public folder)
    // -------------------------------------------------------
    // const logo = (
    //   <Box
    //     component="img"
    //     src="/logo/logo_single.svg" => your path
    //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
    //   />
    // );

    const logo = (
      <Box
        ref={ref}
        component="div"
        sx={{
          width: 60,
          height: 60,
          display: "inline-flex",
          ...sx,
        }}
        {...other}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 60 30"
        >
          <text x="0" y="15" fill={PRIMARY_MAIN}>
            NB
          </text>
        </svg>
      </Box>
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
        {logo}
      </Link>
    );
  },
);

export default Logo;

// routes
import { paths } from "src/routes/paths";

// components
import Iconify from "src/components/iconify";
import { NavItemProps } from "./nav/types";

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: "Home",
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: "/",
  },
  {
    title: "My Notes",
    icon: <Iconify icon="solar:home-2-bold-duotone" />,
    path: paths.notes,
    // children: [{ items: [{ title: "All Notes", path: paths.notes }] }],
  },
];

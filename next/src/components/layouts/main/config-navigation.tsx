// routes

import Iconify from '@/components/iconify';
import { NavItemProps } from './nav/types';
import { paths } from '@/routes/paths';

// ----------------------------------------------------------------------

export const navConfig = [
  {
    title: 'Home',
    icon: <Iconify icon='solar:home-2-bold-duotone' />,
    path: '/',
  },
  {
    title: 'My Notes',
    icon: <Iconify icon='solar:home-2-bold-duotone' />,
    path: paths.notes,
    // children: [{ items: [{ title: "All Notes", path: paths.notes }] }],
  },
  {
    title: 'Profile',
    icon: <Iconify icon='solar:home-2-bold-duotone' />,
    path: paths.profile,
  },
];

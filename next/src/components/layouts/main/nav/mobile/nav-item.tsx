// @mui
import { Link as MUILink } from '@mui/material';
import Link from 'next/link';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// components
import Iconify from '@/components/iconify';
//
import { NavItemMobileProps } from '../types';
import { ListItem } from './styles';

// ----------------------------------------------------------------------

export default function NavItem({
  item,
  open,
  active,
  externalLink,
  ...other
}: NavItemMobileProps) {
  const { title, path, icon, children } = item;

  const renderContent = (
    <ListItem active={active} {...other}>
      <ListItemIcon> {icon} </ListItemIcon>

      <ListItemText disableTypography primary={title} />

      {!!children && (
        <Iconify
          width={16}
          icon={
            open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'
          }
          sx={{ ml: 1 }}
        />
      )}
    </ListItem>
  );

  // External link
  if (externalLink) {
    return (
      <MUILink href={path} target='_blank' rel='noopener' underline='none'>
        {renderContent}
      </MUILink>
    );
  }

  // Has child
  if (children) {
    return renderContent;
  }

  // Default
  return (
    <MUILink component={Link} href={path} underline='none'>
      {renderContent}
    </MUILink>
  );
}

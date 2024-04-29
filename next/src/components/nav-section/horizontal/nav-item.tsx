import { forwardRef } from 'react';
// @mui
import Box from '@mui/material/Box';
import { Link as MUILink } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import ListItemText from '@mui/material/ListItemText';
// routes
import Link from 'next/link';
//
import Iconify from '../../iconify';
//
import { NavItemProps, NavConfigProps } from '../types';
import { StyledItem, StyledIcon } from './styles';

// ----------------------------------------------------------------------

type Props = NavItemProps & {
  config: NavConfigProps;
};

const NavItem = forwardRef<HTMLDivElement, Props>(
  ({ item, depth, open, active, externalLink, config, ...other }, ref) => {
    const { title, path, icon, info, children, disabled, caption, roles } =
      item;

    const subItem = depth !== 1;

    const renderContent = (
      <StyledItem
        disableGutters
        ref={ref}
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        config={config}
        {...other}
      >
        {icon && <StyledIcon size={config.iconSize}>{icon}</StyledIcon>}

        {!(config.hiddenLabel && !subItem) && (
          <ListItemText
            sx={{
              ...(!subItem && {
                ml: 1,
              }),
            }}
            primary={title}
            primaryTypographyProps={{
              noWrap: true,
              typography: 'body2',
              textTransform: 'capitalize',
              fontWeight: active ? 'fontWeightBold' : 'fontWeightMedium',
              ...(subItem && {
                fontWeight: active ? 'fontWeightSemiBold' : 'fontWeightMedium',
              }),
            }}
          />
        )}

        {info && (
          <Box component='span' sx={{ ml: 0.5, lineHeight: 0 }}>
            {info}
          </Box>
        )}

        {caption && (
          <Tooltip title={caption} arrow>
            <Iconify
              width={16}
              icon='eva:info-outline'
              sx={{ ml: 0.5, color: 'text.disabled' }}
            />
          </Tooltip>
        )}

        {!!children && (
          <Iconify
            icon={
              subItem
                ? 'eva:arrow-ios-forward-fill'
                : 'eva:arrow-ios-downward-fill'
            }
            width={16}
            sx={{ flexShrink: 0, ml: 0.5 }}
          />
        )}
      </StyledItem>
    );

    // Hidden item by role
    if (roles && !roles.includes(`${config.currentRole}`)) {
      return null;
    }

    // External link
    if (externalLink)
      return (
        <MUILink
          href={path}
          target='_blank'
          rel='noopener'
          underline='none'
          sx={{
            ...(disabled && {
              cursor: 'default',
            }),
          }}
        >
          {renderContent}
        </MUILink>
      );

    // Default
    return (
      <MUILink
        component={Link}
        href={path}
        underline='none'
        sx={{
          ...(disabled && {
            cursor: 'default',
          }),
        }}
      >
        {renderContent}
      </MUILink>
    );
  },
);
NavItem.displayName = 'NavItem';

export default NavItem;

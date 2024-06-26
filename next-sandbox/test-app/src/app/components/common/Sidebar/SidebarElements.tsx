import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import {styled} from '@mui/material/styles';

export const SidebarElements = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {text: 'Accounts', icon: <AccountBoxIcon />},
  {text: 'Transfers', icon: <SwapHorizIcon />},
  {text: 'Transactions', icon: <ListAltIcon />},
  {text: 'Settings', icon: <SettingsIcon />},
];

export const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

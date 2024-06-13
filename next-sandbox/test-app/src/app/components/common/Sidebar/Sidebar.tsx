'use client';
import {useState} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import ListAltIcon from '@mui/icons-material/ListAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import {styled} from '@mui/material/styles';
import {Grid} from '@mui/material';

const DrawerHeader = styled('div')(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const drawerWidth = isSidebarOpen ? '15vw' : '8vw';

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      open={isSidebarOpen}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <DrawerHeader>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      <List>
        {[
          {text: 'Dashboard', icon: <DashboardIcon />},
          {text: 'Accounts', icon: <AccountBoxIcon />},
          {text: 'Transfers', icon: <SwapHorizIcon />},
          {text: 'Transactions', icon: <ListAltIcon />},
          {text: 'Settings', icon: <SettingsIcon />},
        ].map((item, index) => (
          <ListItem
            button
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              minWidth: 0,
              padding: isSidebarOpen ? '' : '8px 0',
            }}
          >
            <Grid
              container
              alignItems='center'
              flexDirection={isSidebarOpen ? 'row' : 'column'}
            >
              <Grid item xs={4}>
                <ListItemIcon sx={{minWidth: 0, justifyContent: 'center'}}>
                  {item.icon}
                </ListItemIcon>
              </Grid>
              {isSidebarOpen && (
                <Grid item xs={8}>
                  <ListItemText primary={item.text} />
                </Grid>
              )}
            </Grid>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

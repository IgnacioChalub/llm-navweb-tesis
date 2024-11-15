import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SavingsIcon from '@mui/icons-material/Savings';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import {CreditCard} from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Drawer
      variant='persistent'
      open
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: 'border-box',
        },
      }}
    >
      <Box sx={{overflow: 'auto'}}>
        <Typography variant='h4' sx={{p: 2}}>
          SmartBank
        </Typography>
        <List>
          <ListItem button key='Dashboard'>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem>
          <ListItem button key='Accounts'>
            <ListItemIcon>
              <CreditCard />
            </ListItemIcon>
            <ListItemText primary='Accounts' />
          </ListItem>
          <ListItem button key='Transfer'>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary='Transfer' />
          </ListItem>
          <ListItem button key='Savings'>
            <ListItemIcon>
              <SavingsIcon />
            </ListItemIcon>
            <ListItemText primary='Savings' />
          </ListItem>
        </List>
        <Typography variant='h6' sx={{p: 2}}>
          Account
        </Typography>
        <List>
          <ListItem button key='Settings'>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItem>
          <ListItem button key='Logout'>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary='Logout' />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;

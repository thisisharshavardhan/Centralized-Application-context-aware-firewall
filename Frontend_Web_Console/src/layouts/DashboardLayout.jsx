import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ThemeContext } from '../theme';
import { AppBar, Box, CssBaseline, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DevicesIcon from '@mui/icons-material/Devices';
import RuleIcon from '@mui/icons-material/Rule';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import { Group } from '../../../firewall_API/src/models/group.model';

const drawerWidth = 240;

const navItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  {text: 'Groups', icon: <GroupIcon/>, path: '/groups' },
  { text: 'Devices', icon: <DevicesIcon />, path: '/devices' },
  { text: 'Rules', icon: <RuleIcon />, path: '/rules' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

export default function DashboardLayout() {
  const theme = useTheme();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            CACAF
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                >
                  <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
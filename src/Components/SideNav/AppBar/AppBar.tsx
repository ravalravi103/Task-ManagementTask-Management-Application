import React from 'react';
import { AppBar as MuiAppBar, Toolbar, IconButton, Box, Typography, styled } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface AppBarProps {
  darkMode: boolean;
  changeMode: () => void;
  open: boolean;
  handleDrawerOpen: () => void;
}

const DrawerAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBarComponent: React.FC<AppBarProps> = ({
  darkMode,
  changeMode,
  open,
  handleDrawerOpen,
}) => {
  return (
    <DrawerAppBar position="fixed" open={open} darkMode={darkMode} changeMode={changeMode} handleDrawerOpen={handleDrawerOpen}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div">
          Task Manager
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton
          color="inherit"
          aria-label="toggle dark mode"
          onClick={changeMode}
          title={`${darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}`}
        >
          {darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
      </Toolbar>
    </DrawerAppBar>
  );
};

export default AppBarComponent;


import React from 'react';
import { IconButton, AppBar, Toolbar } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

const Header = ({ darkMode, callbackChangeMode }) => {
  const handleColorMode = () => {
    callbackChangeMode();
  };

  return (
    <AppBar position="static" color='transparent' style={{ boxShadow: 'none' }}>
      <Toolbar>
        <div style={{ flexGrow: 1 }}></div>
        <IconButton color="inherit" onClick={handleColorMode}>
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
